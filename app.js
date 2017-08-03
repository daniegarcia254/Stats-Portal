'use strict'

var ApiBuilder = require('claudia-api-builder'),
	api = new ApiBuilder({mergeVars: true}),
	jwt = require('jsonwebtoken');

module.exports = api;


// CORS configuration
api.corsHeaders('Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Api-Version,X-Requested-With');
api.corsMaxAge(60);

// Warm up lambda function
// The goal of this function is to be called in order to wake up the AWS Lambda service that turns inactive after sometime of not being used
api.get('/warm', function(request) {
	return new api.ApiResponse('Lambda function is warm up', {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 200);
});


// User login
api.post('/login', function (request) {
	
	return new Promise((resolve, reject) => {
		var username = request.body.username;
		var password = request.body.password;
		var error;
		
		if (!username || !password) {
			error = new Error('Invalid username and/or password');
			error.description = 'Invalid username and/or password';
			error.code = 'Unauthorized';
			error.status = 401;
			reject(error);
		} else if (username !== process.env.MASTER_USER || password !== process.env.MASTER_PWD) {
			error = new Error('Invalid username and/or password');
			error.description = 'Invalid username and/or password';
			error.code = 'Unauthorized';
			error.status = 401;
			reject(error);
		} else {
	    	var duration = parseInt(process.env.SESSION_DURATION);
            var expires = new Date(Date.now() + duration*1000);
			var token = jwt.sign(
				{ user_id: [process.env.MASTER_USER, process.env.MASTER_PWD].join('#') },
				process.env.SESSION_SECRET,
                { expiresIn: duration });

            resolve({
                user: username,
                token: token,
                expires: expires
            });
		}
	}).then((result) => {
		console.log("Success login user: ", result);
		return new api.ApiResponse(result, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 200);
	}).catch((error) => {
		console.log("Error on login user", error);
		return new api.ApiResponse(error, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 401);
	});
});

// Verify if the JWT token is valid
var verifyToken = function(request, callback){
	var header = request.headers && request.headers.Authorization;
    var matches = header ? /^Bearer (\S+)$/.exec(request.headers.Authorization) : null;
    var token = matches && matches[1];
    var error;

    if (!token) {
    	error = new Error('No authorization token was found');
    	error.description = 'No authorization token was found';
    	error.code = 'Not Found';
    	error.status = 404;
    	return callback(error);
    }

    jwt.verify(token, process.env.SESSION_SECRET, function(err, decoded) {
        if (err) {
            return callback(err);
        }

        if (!decoded.user_id || decoded.user_id !== [process.env.MASTER_USER,process.env.MASTER_PWD].join('#')) {
        	error = new Error('User is not authorized to perform this action');
        	error.description = 'User is not authorized to perform this action';
        	error.code = 'Unauthorized';
        	error.status = 401;
        	return callback(error);
        }

        return callback();
    });
}

// Return database data
api.get('/', function (request) {
	var connection;
	return new Promise((resolve, reject) => {
		try {
			verifyToken(request, function(err){
				if (err) {
					reject(err);
				} else {
					var mysql = require('mysql');
					connection = mysql.createConnection({
						host: process.env.MYSQL_HOST,
					  	user     : process.env.MYSQL_USER,
					  	password : process.env.MYSQL_PWD,
					  	database : process.env.MYSQL_DB,
					  	insecureAuth: true
					});

					connection.connect(function(err) {
						if (err) {
							console.error('error connecting: ' + err.stack);
							return reject(err);
						}
						console.log('connected as id ' + connection.threadId);
						connection.query('SELECT * FROM TABLEX', function (error, results, fields) {
							if (error) {
								console.log('Error making query: ', error);
								reject(error);
							} else {
								resolve(results);
							}
						});
					});
				}
			});
		} catch(error) {
			reject(error);
		} finally {
			if (connection) connection.end();
		}
	}).then((results) => {
		console.log("Success getting data: ", results);
		return new api.ApiResponse(results, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 200);
	}).catch((error) => {
		console.log("Error getting data results: ", error);
		return new api.ApiResponse(error, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, error.status ? error.status : 500);
	});
});

api.post('/logout', function(request) {
	return new Promise((resolve, reject) => {
		verifyToken(request, function(err){
			if (err) reject(err);
			else resolve();
		});
	}).then((result) => {
		console.log("Success logout user: ", result);
		return new api.ApiResponse(result, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 200);
	}).catch((error) => {
		console.log("Error logut: ", error);
		return new api.ApiResponse(error, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, error.status ? error.status : 500);
	});
});
