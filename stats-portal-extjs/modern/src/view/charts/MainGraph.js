Ext.define('PortalStats.view.charts.MainGraph', {
	extend: 'Ext.Panel',
	alias: 'widget.maingraphview',

	requires: [
		'PortalStats.store.Stats',
		'PortalStats.view.charts.MainGraphController',
		'PortalStats.view.charts.MainGrid',
		'Ext.chart.MyTimeSegmenter',
		'Ext.chart.CartesianChart',
		'Ext.chart.axis.Time'
	],

	controller: 'main-graph',

	layout: {
		type: 'vbox',
		pack: 'start',
		align: 'center'
	},

	items: [
		{
			xtype: 'cartesian',
			reference: 'chart',
			height: 300,
			width: '90%',
			minHeight: 300,
        	margin: '20 0 10 0',
        	insetPadding: '30 20 0 0',
			store: {
            	type: 'stats',
            	listeners: {
					load: function(store, records, successful, operation, eOpts){
						setTimeout(function () { if (Ext.getCmp('app-main')) Ext.getCmp('app-main').unmask(); }, 1000);
					}
				}
			},
			legend: {
				docked: 'bottom'
			},
			interactions: [{
				type: 'panzoom',
				zoomOnPan: true,
				doubleTapReset: true,
				axes: {
					left: false,
					bottom: true
				}
			}],
			axes: [
				{
					type: 'numeric',
					fields: ['active_users','moe_licenses','language_no_es','ftfe','phone_classes'],
					id: 'main-graph-y-axis',
					minimum: 0,
					grid: true,
					position: 'left',
					title: 'Number of users'
				}, {
					type: 'time',
					position: 'bottom',
					fields: ['stat_date'],
					id: 'main-graph-x-axis',
					segmenter: 'mytimesegmenter',
					dateFormat: 'd-M-y',
					label: {
						fontSize: '12px',
						fontWeight: 'bold',
						x: -15,
						rotate: {
							degrees: -45
						}
					}
				}
			]
		},{
			xtype: 'maingrid',
			width: '100%',
			padding: '0 5%'
		}
	],

    listeners: {
        initialize: 'onAfterRender'
    }
});