Ext.define('PortalStats.view.charts.MainGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'maingrid',

    requires: [
        'PortalStats.store.Stats',
        'PortalStats.view.charts.MainGraphController'
    ],

    id: 'main-grid',

    layout: 'fit',

    listeners: {
        afterrender: function(){
            Ext.getCmp('main-grid').mask();
        }
    },
	
    masked: {
        xtype: 'loadmask',
        message: '',
        indicator: false,
        html: "<img src='resources/images/loading_icon.gif'/>"
    },

    items: [{
        xtype: 'container',
        padding: '20 0 20 0',
        layout: {
            type: 'fit',
            align: 'stretch',
            pack: 'center'
        },
        items:[{
            xtype: 'grid',
            id: 'mainGrid',
            
            layout: 'fit',
            maxHeight: 500,
            minHeight: 300,
            width: '100%',

            store: {
                type: 'stats',
                listeners: {
                    load: function(store, records, successful, operation, eOpts){
                        if (Ext.getCmp('main-grid')) Ext.getCmp('main-grid').unmask();
                        var dateFilter = new Ext.util.Filter({
                            filterFn: function (item) {
                                var date = moment(item.data.stat_date),
                                    day = date.date(),
                                    month = date.month() + 1;
                                
                                if (day === 15) return true;
                                else {
                                    switch (month) {
                                        case 2: {
                                            return day === 28;
                                        }
                                        case 1:
                                        case 3:
                                        case 5:
                                        case 7:
                                        case 8:
                                        case 10:
                                        case 12: {
                                            return day === 31;
                                        }
                                        default: {
                                            return day === 30;
                                        }

                                    }
                                }
                            }
                        });
                        store.filter(dateFilter);
                    }
                }
            },

            columns: [{ 
                dataIndex: 'stat_date',
                xtype: 'datecolumn',
                format: 'd-M-Y',
                text: 'Date',
                flex: 1
            },{ 
                dataIndex: 'active',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Active users',
                flex: 1
            },{ 
                dataIndex: 'pending',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Pending users',
                flex: 1
            },{ 
                dataIndex: 'suspended',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Suspended users',
                flex: 1
            },{ 
                dataIndex: 'retired',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Retired users',
                flex: 1
            }]
        }]
    }]
});
