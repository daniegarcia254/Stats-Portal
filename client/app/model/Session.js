Ext.define('PortalStats.model.Session', {
    extend: 'Ext.data.Model',
    alias: 'model.session',   

    fields: [
        { name: 'token', type: 'string' },
        { name: 'expires', type: 'date' },
        { name: 'user', type: 'string' }
    ],

    statics: {
        login: function(username, password) {
            return new Ext.Promise(function (resolve, reject) {
                Ext.Ajax.request({
                    url :  config.getBack() + 'login',
                    method:'POST',
                    params: JSON.stringify({
                        username: username,
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    success: function(result, opts) {
                        var sessionData = Ext.decode(result.responseText);
                        console.log('Success login user:', sessionData);
                        var session = PortalStats.model.Session.loadData(sessionData);
                        if (!session.isValid()) {
                            var error = new Error();
                            error.description = 'Login failed: invalid or expired session';
                            error.code = 'Unauthorized';
                            error.status = 401;
                            return reject(error);
                        }
                        resolve(session);
                    },
                    failure: function(err, opts) {
                        console.log('Failure login user', err);
                        reject(err);
                    }
                });
            });
        },

        logout: function() {
            return new Ext.Promise(function (resolve, reject) {
                Ext.Ajax.request({
                    url :  config.getBack() + 'logout',
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': config.getToken()
                    },
                    success: function(result, opts) {
                        resolve();
                    },
                    failure: function(err, opts) {
                        console.log('Failure on user logout', err);
                        reject(err);
                    }
                });
            });
        }
    },

    isValid: function() {
        return !Ext.isEmpty(this.get('token'))
            && this.get('expires') > new Date()
            && this.get('user') !== null;
    }
});
