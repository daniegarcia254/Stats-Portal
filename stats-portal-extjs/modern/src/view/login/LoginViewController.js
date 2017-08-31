Ext.define('PortalStats.view.login.LoginViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.loginViewCtrl',

	requires: [
		'PortalStats.view.main.Main',
		'PortalStats.util.State',
		'PortalStats.model.Session'
	],

	initKeyMappings: function () {
		this.getView().unmask();
		// Init key mappings
		var usernameFieldKeyMapp = new Ext.util.KeyNav({
			target: Ext.getCmp('auth-login').down('formpanel').getFields('username').el,
			enter: function (e) {
				this.getView().down('formpanel').getFields('password').focus();
			},
			scope: this
		});
		var passwordFieldKeyMapp = new Ext.util.KeyNav({
			target: Ext.getCmp('auth-login').down('formpanel').getFields('password').el,
			enter: function (e) { this.onLoginClick(); },
			scope: this
		});
	},

	onLoginClick: function () {
		
		var self = this,
			form = Ext.getCmp('auth-login').down('formpanel'),
			values = form.getValues();

		if (form.validate() === true) {
			try {
				Ext.getCmp('login-form-error-label').setHidden(true);

				Ext.getCmp('auth-login').mask();

				PortalStats.model.Session.login(values.username, values.password)
					.then(function (session) {
						config.setToken('Bearer ' + session.get('token'));
						PortalStats.util.State.set('session', session && session.getData(true));

						self.getView().destroy();

						// Add the main view to the viewport
						Ext.create('PortalStats.view.main.Main',{fullscreen: true});
					})
					.catch(function (errors) {
						console.log('Error on login', errors);
						try {
							if (Ext.decode(errors.responseText).description || errors.description) {
								var message = errors.description ? errors.description : Ext.decode(errors.responseText).description;
								Ext.getCmp('login-form-error-label').setHtml(message);
							} else {
								Ext.getCmp('login-form-error-label').setHtml('Unauthorized');
							}
							Ext.getCmp('login-form-error-label').setHidden(false);
						} catch (error) {
							console.log('Error catch on login', error);
							if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').unmask();
						}
					})
					.then(function (session) {
						if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').unmask();
					});
			} catch (error) {
				console.log('Error onLoginClick', error);
				if (Ext.getCmp('auth-login')) Ext.getCmp('auth-login').unmask()
			}
		}
	}
});