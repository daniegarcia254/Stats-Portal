/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 */
Ext.define('PortalStats.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'PortalStats.view.main.MainController',
        'PortalStats.view.main.MainModel',
        'PortalStats.view.charts.MainGraph'
    ],

    controller: 'main',

    plugins: 'viewport',

    ui: 'navigation',

    titleRotation: 0,
    tabRotation: 0,
    tabPosition: 'top',

    header: {
        layout: {
            align: 'fit'
        },
        height: 60,
        items: [{
            xtype: 'component',
            reference: 'portalLogo',
            cls: 'portal-logo',
            html: '<div class="main-logo"><img src="resources/images/logo.jpg"></div>',
            width: 260
        },{
            xtype: 'button',
            cls: 'logout-btn',
            text: 'Logout',
            margin: '10 20',
            handler: 'onLogout'
        }]
    },

    tabBar: {
        flex: 1,
        height: 50,
        layout: {
            align: 'stretch',
            overflowHandler: 'menu'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'top'
        }
    },

    defaults: {
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'left',
                    textAlign: 'left'
                }
            }
        }
    },

    items: [{
        xtype: 'container',
        title: 'Main Stats',
        id: 'main-app-container',
        iconCls: 'fa-area-chart',
        layout: 'fit',
        margin: '0 0 50 0 ',
        style: 'overflow:auto',
        listeners: {
            afterrender: function(){
                this.setLoading(true);
            }
        },
        items: [{
            xtype: 'container',
            style: 'overflow:auto',
            layout: 'anchor',
            id: 'main-app-sub-container',
            items: [{
                xtype: 'main-graph-view'
            }]
        }]
    }]
});
