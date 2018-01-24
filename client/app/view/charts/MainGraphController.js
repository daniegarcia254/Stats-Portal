Ext.define('PortalStats.view.charts.MainGraphController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-graph',

    onReload: function () {
        var chart = this.lookupReference('chart'),
            grid = Ext.getCmp('mainGrid');

        chart.up('main-graph-view').setLoading(true);
        grid.setLoading(true);
        chart.getStore().load({
            callback: function (records, operation, success) {
                grid.getStore().load({
                    callback: function(records, operation, success) {
                        chart.up('main-graph-view').setLoading(false);
                        grid.setLoading(false);
                    }
                });
            }
        });
    },

    getSeriesConfig: function (field, title) {
        return {
            type: 'area',
            title: title,
            xField: 'stat_date',
            yField: field,
            style: {
                opacity: 0.60
            },
            marker: {
                opacity: 0,
                scaling: 0.01,
                fx: {
                    duration: 200,
                    easing: 'easeOut'
                }
            },
            highlightCfg: {
                opacity: 1,
                scaling: 1.5
            },
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record, item) {
                    var date = moment(record.get('stat_date')),
                        month =  config.getMonths()[date.month()],
                        day = date.date();
                    
                    tooltip.setHtml(title + ' (' + day + 'th - ' + month + '): ' + record.get(field));
                }
            }
        };
    },

    onAfterRender: function () {
        var me = this,
            chart = me.lookupReference('chart');

        chart.setSeries([
            me.getSeriesConfig('active', 'Active Users'),
            me.getSeriesConfig('pending', 'Pending Users'),
            me.getSeriesConfig('suspended', 'Suspended Users'),
            me.getSeriesConfig('retired', 'Retired Users')
        ]);
    }
});
