import Ember from 'ember';

export default Ember.Mixin.create({
	subscribeTo(subscription, type, items, fields) {
		var subscription = new Lightstreamer.Subscription(
			type, items, fields
		);
		config.APP.api.subscription = subscription;
		subscription.setRequestedSnapshot("yes");
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
				var epic = updateInfo.getItemName().split(":")[1];
				var tidyEpic = epic.replace(/\./g, "_");
				updateInfo.forEachField(function(fieldName, fieldPos, value) {
					let index = that.findIndex(that.get('results'), 'tidyEpic', tidyEpic);
					let obj = that.get("results").objectAt(index);
					if (fieldName === 'OFFER') {
						var newClass = that.getNewClass(obj, 'offer', value);
						Ember.set(obj, "offer", value);
						var cell = document.getElementById(obj.linkIdOffer);
					} else if (fieldName === 'BID') {
						var newClass = that.getNewClass(obj, 'bid', value);
						Ember.set(obj, "bid", value);
						var cell = document.getElementById(obj.linkIdBid);
					}
					cell.className += " " + newClass;

					Ember.run.later((function() {
						cell.className -= " " + newClass;
					}), 500);
				});
			}
		});
		config.APP.api.lsClient.subscribe(subscription);
	}
});
