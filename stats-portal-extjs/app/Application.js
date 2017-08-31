/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('PortalStats.Application', {
    extend: 'Ext.app.Application',
    
    name: 'PortalStats',

    requires: [
        'Ext.data.*',
        'Ext.chart.*',
        'Ext.layout.*',
        'PortalStats.util.State',
        'PortalStats.model.Session',
        'PortalStats.view.*'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {

        // Start task runner to warm up lambda function
        var warmUp = function() {
            Ext.Ajax.request({
                url :  config.getBack() + 'warm',
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                callback: function() {
                   console.log('Warm up finished');
                }
            });
        }

        var runner = new Ext.util.TaskRunner();
        var task = runner.start({
            run: warmUp,
            interval: config.getWarmUpTime()
        });


        // Check if session exists
        var data = PortalStats.util.State.get('session'),
            session = data ? PortalStats.model.Session.loadData(data) : null;

        // Destroy the masks
        var mask = Ext.get('preloader_mask'),
            parent = Ext.get('preloader_anim');
        mask.destroy();
        parent.destroy();

        // If session valid --> Load main app
        if (session && session.isValid()) {
            console.log('Session is valid --> Open main app', session);
            config.setToken('Bearer ' + session.get('token'));
            Ext.create('PortalStats.view.main.Main', { fullscreen: true });

        // If session is not valid --> Go to login screen
        } else {
            console.log('Session is not valid --> Go login');
            config.setToken(null);
            Ext.create('PortalStats.view.login.Login', { fullscreen: true });
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
