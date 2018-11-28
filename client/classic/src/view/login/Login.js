Ext.define('PortalStats.view.login.Login', {
    extend: 'Ext.panel.Panel',
    xtype: 'login',

    requires: [
        'PortalStats.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',

    cls: 'auth-login',
    id: 'auth-login',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    plugins: 'viewport',

    items: [{
        xtype: 'panel',
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        padding: '75 50',
        cls: 'auth-middle-panel',
        items: [{
            xtype: 'label',
            id: 'login-form-error-label',
            hidden: true,
            margin: '10 0 10 0',
            padding: '0 0 10 0'
        },{
            xtype: 'label',
            style: 'font-size: 20px',
            html: 'Sign into your account',
            margin: '10 0 10 0',
            padding: '0 0 10 0'
        },{
            xtype: 'form',
            reference: 'form',
            layout: 'vbox',

            defaults: {
                margin: '10 0'
            },

            items: [{
                xtype: 'textfield',
                name: 'username',
                emptyText : 'Username',
                value: 'stats',
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'password',
                emptyText : 'Password',
                inputType: 'password',
                value: 'st4ts',
                allowBlank: false
            }],
            buttonAlign: 'center',
            buttons: [{
                text: 'LOG IN',
                iconCls: 'x-fa fa-angle-right',
                formBind: true,
                cls: 'auth-btn',
                handler: 'onLoginClick',
                margin: '20 0 0 0'
            }]
        }]
    }],
    listeners: {
        afterrender: 'initKeyMappings'
    }
});