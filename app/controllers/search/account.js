import Ember from 'ember';
import config from '../../config/environment';


export default Ember.Controller.extend({
	activeAccount: config.APP.api.activeAccout,
	account: {
		'EQUITY': 'NA',
		'PNL': 'NA',
		'FUNDS': 'NA',
		'MARGIN': 'NA',
		'AVAILABLE_TO_DEAL': 'NA'
	},

	actions: {
		getAcountDetails() {
			console.log('init acc details');
			const that = this;
			const fields = ['PNL', 'EQUITY', 'FUNDS', 'MARGIN', 'AVAILABLE_TO_DEAL'];
			const accountID = `ACCOUNT:${this.get('activeAccount')}`;
			var subscription = new Lightstreamer.Subscription(
				"MERGE", accountID, fields
			);
			subscription.addListener({
				onSubscription: function() {
					console.log('subscribed');
				},
				onUnsubscription: function() {
					console.log('unsubscribed');
				},
				onSubscriptionError: function(code, message) {
					console.log('subscription failure: ' + code + " message: " + message);
				},
				onItemUpdate: function(updateInfo) {
					updateInfo.forEachField(function(fieldName, fieldPos, value) {
						Ember.set(that.get('account'), fieldName, value);
					});
				}
			});
			config.APP.api.lsClient.subscribe(subscription);
		},

		getAllAccountDetails() {
			console.log('init all acc details');
			let that = this;
			var req = {};

			req.headers = {
				"Content-Type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-IG-API-KEY": config.APP.api.key,
				"CST": config.APP.api.CST,
				"X-SECURITY-TOKEN":config.APP.api.securityToken,
				"Version": "1"
			};
			Ember.$.ajax({
				type: 'GET',
				url: 'https://demo-api.ig.com/gateway/deal/accounts',
				headers: req.headers,
				async: false,
				mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
			}).then(function(response, status, data) {
				console.log(response);
			}, function(e) {
				console.log(e);
			});
		}
	}
});
