Ext.define('PortalStats.view.charts.MainGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'main-grid',

    requires: [
        'PortalStats.store.Stats',
        'PortalStats.view.charts.MainGraphController',
        'Ext.grid.filters.Filters'
    ],

    controller: 'main-graph',
    id: 'main-grid',

    layout: 'fit',
    maxHeight: 500,

    listeners: {
        afterrender: function(){
            Ext.getCmp('main-grid').setLoading(true);
        }
    },

    items: [{
        xtype: 'container',
        padding: '20%',
        layout: {
            type: 'fit',
            align: 'stretch',
            pack: 'center'
        },
        items:[{
            xtype: 'grid',
            id: 'mainGrid',
            cls: 'main-grid',
            
            plugins: 'gridfilters',
            collapsible: true,
            
            layout: 'fit',
            width: '100%',

            store: {
                type: 'stats',
                listeners: {
                    load: function(store, records, successful, operation, eOpts){
                        Ext.getCmp('main-grid').setLoading(false);
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
                flex:1,
                filter: {
                    type: 'date'
                }
            },{ 
                dataIndex: 'active',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Active users',
                flex:1
            },{ 
                dataIndex: 'pending',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Pending users',
                flex:1
            },{ 
                dataIndex: 'suspended',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Suspended users',
                flex:1
            },{ 
                dataIndex: 'retired',
                xtype: 'numbercolumn',
                format: '0,000',
                text: 'Retired users',
                flex:1
            }]
        }]
    }]
});
