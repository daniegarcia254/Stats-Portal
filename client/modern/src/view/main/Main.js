Ext.define('PortalStats.view.main.Main', {
	extend: 'Ext.Panel',
	alias: 'widget.app-main',

	requires: [
		'PortalStats.view.charts.MainGraph',
		'PortalStats.view.charts.MainGrid',
		'PortalStats.view.main.MainController'
	],

	controller: 'main',
	id: 'app-main',

	masked: {
		xtype: 'loadmask',
		message: '',
		indicator: false,
		html: "<img src='resources/images/loading_icon.gif'/>"
	},

	header: {
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		id: 'main-header',
		height: 60,
		items: [{
			xtype: 'component',
			reference: 'portalLogo',
			cls: 'portal-logo',
			html: '<div class="main-logo"><img src="resources/images/logo.jpg"></div>',
			margin: '15 0',
			width: 260,
			flex: 1
		},{
			xtype: 'component',
			flex: 1
		},{
			xtype: 'button',
			cls: 'logout-btn',
			text: 'Logout',
			margin: '10 20',
			handler: 'onLogout',
			flex: 1
		}]
	},

	layout: {
		type: 'fit'	
	},

	items: [{
		xtype: 'tabpanel',
		items: [
			{
				xtype: 'container',
				title: 'Main Stats',
				scrollable: true,
				layout: 'vbox',
				items: [
					{
						xtype: 'maingraphview'
					}
				]
			}
		]
	}]
});
