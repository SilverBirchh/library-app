import Ember from 'ember';
import config from '../../config/environment';


export default Ember.Controller.extend({
	activeAccount: config.APP.api.activeAccout,
	results: [],

	actions: {
		getAllAccountDetails() {
			console.log('init all acc details');
			let that = this;
			var req = {};

			req.headers = {
				"Content-Type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-IG-API-KEY": config.APP.api.Key,
				"CST": config.APP.api.CST,
				"X-SECURITY-TOKEN": config.APP.api.securityToken,
				"Version": "1"
			};
			Ember.$.ajax({
				type: 'GET',
				url: 'https://demo-api.ig.com/gateway/deal/accounts',
				headers: req.headers,
				async: false,
				mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
			}).then(function(response, status, data) {
				that.get('results').clear();
				console.log(response);
				for (var i = 0; i < response.accounts.length; i++) {
					that.get('results').addObject(response.accounts[i]);
				}
			}, function(e) {
				console.log(e);
			});
		}
	}
});
