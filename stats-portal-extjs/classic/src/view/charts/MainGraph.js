/**
 * A basic area chart is similar to the line chart, except the area between axis and line
 * is filled with colors to emphasize quantity.
 */
Ext.define('PortalStats.view.charts.MainGraph', {
    extend: 'Ext.Panel',
    xtype: 'main-graph-view',
    controller: 'main-graph',

    requires: [
        'PortalStats.store.Stats',
        'PortalStats.view.charts.MainGraphController',
        'PortalStats.view.charts.MainGrid',
        'Ext.chart.MyTimeSegmenter',
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Time'
    ],

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },

    id: 'main-graph-view',

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        id: 'main-graph',
        width: '100%',
        height: 500,
        margin: '20 0 0 0',
        insetPadding: '30 50 10 0',
        store: {
            type: 'stats',
            listeners: {
                load: function(store, records, successful, operation, eOpts){
                    setTimeout(function(){ Ext.getCmp('main-app-container').setLoading(false); }, 1000);
                }
            }
        },
        legend: {
            docked: 'bottom'
        },
        captions: {
            title: 'User stats'
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['active_users', 'moe_licenses', 'language_no_es','ftfe','phone_classes'],
            title: 'Number of users',
            titleMargin: 40,
            grid: true,
            minimum: 0,
            id: 'main-graph-y-axis'
        }, {
            type: 'time',
            position: 'bottom',
            fields: ['stat_date'],
            id: 'main-graph-x-axis',
            segmenter: 'mytimesegmenter',
            dateFormat: 'd-M-y',
            label: {
                fontWeight: 'bold',
                x: -15,
                rotate: {
                    degrees: -45
                }
            }
        }]
        // No 'series' config here,
        // as series are dynamically added in the controller.
    },{
        xtype: 'toolbar',
        docked: 'bottom',
        ui: 'footer',
        flex: 1,
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [
            { xtype: 'button', iconCls: 'x-fa fa-refresh', cls: 'app-btn', handler: 'onReload', width: 50 }
        ]
    },{
        xtype: 'main-grid',
        flex: 1,    
        width: '100%',
        padding: '0 50'
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});
