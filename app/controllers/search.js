import Ember from 'ember';
import config from '../config/environment';
import findIndex from '../mixins/find-with-attr';
import findClass from '../mixins/get-updated-class';

export default Ember.Controller.extend(findIndex, findClass, {

	activeAccount: config.APP.api.activeAccout,
	isLoggedIn: config.APP.api.activeAccout,

	activeAccount: config.APP.api.activeAccout,
	account: {
		'ID': '',
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
		}
	}
});
