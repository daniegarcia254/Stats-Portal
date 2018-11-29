Ext.define('PortalStats.view.login.Login', {
    extend: 'Ext.Container',
    alias: 'widget.login-panel',

    requires: [
        'PortalStats.view.login.LoginViewController',
        'PortalStats.view.login.LoginViewModel',
        'Ext.form.Panel',
        'Ext.Container',
        'Ext.Label',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.Button'
    ],

    controller: 'loginViewCtrl',
    viewModel: {
        type: 'login'
    },
    id: 'auth-login',

    masked: {
        xtype: 'loadmask',
        message: '',
        indicator: false,
        html: "<img src='resources/images/loading_icon.gif'/>"
    },

    items: [
        {
            xtype: 'container',
            centered: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            padding: 10,
            items: [
                {
                    xtype: 'formpanel',
                    items: [{
                            xtype: 'label',
                            id: 'login-form-error-label',
                            html: 'Invalid username/password',
                            hidden: true,
                            margin: '10 0 10 0',
                            padding: '0 0 10 0'
                        },
                        {
                            xtype: 'label',
                            style: 'font-size: 20px; text-align: center',
                            html: 'Sign into your account',
                            margin: '10 0 0 0',
                            padding: '0 0 10 0'
                        },
                        {
                            xtype: 'textfield',
                            name: 'username',
                            scrollable: false,
                            label: 'Username',
                            value: 'stats',
                            labelWidth: '40%',
                            required: true,
                            errorTarget: 'side',
                            keyMapEnabled: true
                        },
                        {
                            xtype: 'passwordfield',
                            name: 'password',
                            scrollable: false,
                            label: 'Password',
                            value: 'st4ts',
                            labelWidth: '40%',
                            required: true,
                            errorTarget: 'side'
                        }
                    ],
                    buttonAlign: 'center',
                    buttons: [{
                        text: 'LOG IN',
                        iconCls: 'x-fa fa-angle-right',
                        handler: 'onLoginClick',
                        formBind: true,
                        margin: '20 0 0 0'
                    }]
                }
            ]
        }
    ],
    listeners: {
        initialize: 'initKeyMappings'
    }
});