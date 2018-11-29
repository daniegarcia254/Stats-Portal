# Stats Portal

ExtJS universal (modern && classic) responsive web portal with login and user statistics visualization.

* Frontend has been developed using [Ext JS 6.5.3](http://docs.sencha.com/extjs/6.5.3/)
* Backend has been developed with NodeJS && ExpressJS, and deployed as an AWS Lambda function using [Claudia.js](https://claudiajs.com/)

User will be able to login in the portal and see some user statistics represented in a graph and a grid.

## Table of Contents

* [Configuration](#configuration)
    * [Database](#database)
    * [Server](#server)
    * [Client](#client)
* [Deploy](#deploy)

## Configuration

### Database

For the database, [JawsDB MySql](https://devcenter.heroku.com/articles/jawsdb#backup-import-data-from-jawsdb-or-another-mysql-database) Heroku plugin is used.

Datbase credentials will be saved on Heroku Config Var: JAWSDB_URL

### Server
##### AWS Credentiasl
To deploy the server with  _ClaudiaJS_ you will need and AWS account correctly configured. Make sure that claudia.js is correctly installed and configured following these [instructions](https://claudiajs.com/tutorials/installing.html).

Once you have everything configured, just put your AWS user credentials in the [server/aws-credentials](server/aws-credentials) file with the following format:
```
[username]
aws_access_key_id = XXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXX
```

##### Database and other
Fill the env var values in the file [server/config-env.json](server/config-env.json):

- _MYSQL_HOST_: database host (get it from JAWSDB_URL)
- _MYSQL_PORT_: database port (default: "3306")
- _MYSQL_DB_: database (get it from JAWSDB_URL)
- _MYSQL_USER_: database user (get it from JAWSDB_URL)
- _MYSQL_PWD_: database pwd for user (get it from JAWSDB_URL)
- _MASTER_USER_: client login username (default: "stats")
- _MASTER_PWD_: client login password (default: "st4ts")
- _SESSION_DURATION_: session duration for the JWT (default: "86400" )
- _SESSION_SECRET_: secrte key fot the JWT tokens generation

### Client

* In file [client/app/config/Runtime.js](client/app/config/Runtime.js) just replace _"API_GATEWAY_URL"_ with the backend service URI (usually the one returned by ClaudiaJS when backend is deployed in AWS)

* Compilation
```
sencha app build testing
```


## Deploy

Both frontend and backend are deployed using **Heroku**:

* Frontend: compile version of the portal is deployed with the heroku/php buildpack
```
git push heroku heroku-master:master
```
* Backend: deployed as AWS Lambda using the heroku/nodejs buildpack through a dyno worker
```
heroku run deployapigateway
```