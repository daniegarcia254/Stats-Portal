Ext.define('PortalStats.model.Stat', {
    extend: 'Ext.data.Model',
    alias: 'model.stat',
    idProperty: 'id',
    fields: [
        {name: 'stat_date', type: 'date'},
        {name: 'active', type: 'number'},
        {name: 'pending', type: 'number'},
        {name: 'suspended', type: 'number'},
        {name: 'retired', type: 'number'}
    ],
    proxy: {
        type: 'rest',
        url: config.getBack() + 'stats',
        reader: {
            type: 'json'
        }
    }
});
