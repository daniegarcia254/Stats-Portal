Ext.define('PortalStats.shared.l10n.Localization', {
	singleton: true,
	alternateClassName: [
		'l10n'
	],
	requires: [
		'Ext.String',
		'PortalStats.config.Runtime'
	],
	config: {
		//defaultLanguage: 'es',
		//dictionary: null
	},
	constructor: function(){
		
		Ext.getBody().mask("Please wait...");
		console.log("Loading");

		Ext.Ajax.request({
	        url : config.getBasePath().dictionary, //Path local
	        method:'GET', 
	        scope : this,
	        async: false,
	        //method to call when the request is successful
			success : function(response, opts) {
				try {
					var jsonData = Ext.JSON.decode(response.responseText);
					console.log('jsonData ajax ' ,jsonData);
					config.setDictionary(jsonData);
				} catch(err){
					console.error('No es capaz de decodificar JSON: ', err);
				}
				console.log("Load");
				Ext.getBody().unmask();
			},
			failure: function(response, opts) {
				console.error('No carga JSON de idiomas: ' + response.status);
				Ext.getBody().unmask();
			}

		});
	},
	getDictionary: function(){
		return config.getDictionary() || {};
	},
	/*getLanguage: function(){
		var lenguaje_detectado = window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.systemLanguage || window.navigator.language;
		
		if (lenguaje_detectado.indexOf("-") != -1){
			lenguaje_detectado = lenguaje_detectado.substring(0,lenguaje_detectado.indexOf("-"));
		}
		
		if((this.getDictionary()[lenguaje_detectado] !== undefined)){
			return lenguaje_detectado;
		}
		
		var lenguaje_defecto = this.getDefaultLanguage();
		
		if(lenguaje_defecto){
			return lenguaje_defecto
		}
		
		return null;
	},*/
	t: function(keyVessage, message){
		//var lenguaje = this.getLanguage();
		
		var messageResult = message;
		//console.log('Petición de ',keyVessage, " - ", message);
		
		if(this.getDictionary() !== undefined && this.getDictionary()[keyVessage] !== undefined){
			messageResult = this.getDictionary()[keyVessage];
			
		}else{
			console.warn('No found',keyVessage, " - ", message);
		}
		
		if(arguments.length > 2){
			messageResult=Ext.String.format.apply(null,[messageResult].concat(Array.prototype.slice.call(arguments,2)));
		}
		
		return messageResult;
	}
});
