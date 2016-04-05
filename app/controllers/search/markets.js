import Ember from 'ember';
import config from '../../config/environment';
import findIndex from '../../mixins/find-with-attr';
import findClass from '../../mixins/get-updated-class';

export default Ember.Controller.extend(findIndex, findClass, {
	market: '',
	noMarketImage: 'assets/images/tumble.jpg',
	validSearch: Ember.computed.gte('market.length', 3),
	isDisabled: Ember.computed.not('validSearch'),
	activeAccount: config.APP.api.activeAccout,
	results: [],

	actions: {
		search() {
			const that = this;
			let search = this.get('market').replace(/[^\w\s]/gi, '');
			
			var req = {};
			req.method = "GET";
			req.url = "https://demo-api.ig.com/gateway/deal/markets?searchTerm=" + search;
			req.headers = {
				"X-IG-API-KEY": config.APP.api.Key,
				"X-SECURITY-TOKEN": config.APP.api.securityToken,
				"CST": config.APP.api.CST,
				"Content-Type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8"
			};
			req.body = "";

			Ember.$.ajax({
				type: req.method,
				url: req.url,
				data: req.body,
				headers: req.headers,
				async: false,
				mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
			}).then(function(response, status, data) {
				that.get('results').clear();
				var streamingItems = [];
				for (var i = 0; i < response.markets.length; i++) {
					var marketsData = response.markets[i];
					marketsData.tidyEpic = marketsData.epic.replace(/\./g, "_");
					marketsData.tidyExpiry = marketsData.expiry.replace(/ /g, "");
					marketsData.linkIdEpic = "searchResult_" + marketsData.tidyEpic;
					marketsData.linkIdState = "search_" + marketsData.tidyEpic + "_MARKET_STATE";
					marketsData.linkIdBid = "search_" + marketsData.tidyEpic + "_BID";
					marketsData.linkIdOffer = "search_" + marketsData.tidyEpic + "_OFFER";
					marketsData.state = null;
					if (marketsData.marketStatus === 'EDITS_ONLY') {
						marketsData.state = 'assets/images/edit.png';
					} else if (marketsData.marketStatus === 'TRADEABLE') {
						marketsData.state = 'assets/images/open.png';
					} else {
						marketsData.state = 'assets/images/close.png';
					}

					if (that.get('results').length < 39) {
						that.get('results').addObject(marketsData);
						if (marketsData.streamingPricesAvailable) {
							streamingItems.push("L1:" + marketsData.epic);
						}
					}
				}
				if (config.APP.api.subscription) {
					config.APP.api.lsClient.unsubscribe(config.APP.api.subscription);
				}
				var subscription = new Lightstreamer.Subscription(
					"MERGE", streamingItems, ["BID", "OFFER"]
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
			});
		}
	}
});
