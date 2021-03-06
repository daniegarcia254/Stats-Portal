/* global Ext */
/* global l10n */
/* global config */

Ext.define('PortalStats.config.Runtime',{
    alternateClassName: [
        'config'
    ],
    singleton : true,
    config : {
        basePath: {
            dictionary: 'resources/dictionary.json'
        },
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        back: 'https://y5787f31ki.execute-api.eu-west-1.amazonaws.com/production/',
        token: null,
        warmUpTime: 300000,
        dictionary: null,
        pageSize: 25
    },
    constructor : function(config){
        this.initConfig(config);
    }
});
