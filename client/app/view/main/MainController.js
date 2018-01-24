/**
 * This class is the controller for the main view for the application. It is specified as
 * the 'controller' of the Main view class.
 */
Ext.define('PortalStats.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'PortalStats.util.State',
        'PortalStats.model.Session'
    ],

    closeSession: function(){
        config.setToken(null);
        PortalStats.util.State.set('session', null);

        if (Ext.os.deviceType === 'Phone' || Ext.os.deviceType === 'Tablet') {
            Ext.getCmp('app-main').destroy();
            Ext.create('PortalStats.view.login.Login', { fullscreen: true });
        } else {
            this.getView().destroy();
            Ext.create({
                xtype: 'login'
            });
        }
    },

    onLogout: function () {
        var self = this;
        PortalStats.model.Session.logout()
            .then(function(session) {
                self.closeSession();
            })
            .catch(function(errors) {
                console.log('Error on user logout', errors);
                self.closeSession();
            });
    }
});