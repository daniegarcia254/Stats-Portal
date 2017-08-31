Ext.define('PortalStats.store.Stats', {
    extend: 'Ext.data.Store',
    model: 'PortalStats.model.Stat',
    alias: 'store.stats',

    storeId: 'Stats',

    autoLoad: true,
    autoDestroy: false,

    proxy: {
        type: 'rest',
        url: config.getBack() + 'stats',
        reader: {
            type: 'json'
        }
    },
    sorters: [{
        property: 'stat_date',
        direction: 'ASC'
    }],
    listeners: {
        beforeload: function(store, operation, eOpts) {
            store.getProxy().setHeaders({
                'Authorization': config.getToken()
            });
        },
        load: function(store, records, successful, operation, eOpts) {
            if (successful === false) {
                console.log('Stats loading failed: ', arguments);
                if (Ext.os.deviceType === 'Phone' || Ext.os.deviceType === 'Tablet') {
                    var dialog = Ext.create({
                        xtype: 'dialog',
                        title: 'Warning',
                        maximizable: false,
                        maxWidth: '90%',
                        html: 'There has been an error recovering the stats data. Please, close this message and try again.<br><br>If the error persists, please contact suppor at <a href="mailto:daniegarcia254@gmail.com?Subject=Portal%20Stats%20issue" target="_top">daniegarcia254@gmail.com</a>.',
                        buttons: {
                            ok: function () {
                                dialog.destroy();
                            }
                        }
                    }).show();
                } else {
                    Ext.Msg.alert('Warning', 'There has been an error recovering the stats data. Please, close this message and try again.<br><br>If the error persists, please contact suppor at <a href="mailto:daniegarcia254@gmail.com?Subject=Portal%20Stats%20issue" target="_top">daniegarcia254@gmail.com</a>.');   
                }
            }
        }
    }
});
