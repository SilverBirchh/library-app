import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  market: '',
  noMarketImage: 'assets/images/tumble.jpg',
  validSearch: Ember.computed.gte('market.length', 3),
  isDisabled: Ember.computed.not('validSearch'),
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
          }
        }
        var subscription = new Lightstreamer.Subscription(
          "MERGE", ["MARKET:IX.D.FTSE.DAILY.IP", "MARKET:MT.D.GC.MONTH1.IP"], // e.g. {"MARKET:IX.D.FTSE.DAILY.IP","MARKET:MT.D.GC.MONTH1.IP"}
          ["BID", "OFFER"] // e.g. {"BID", "OFFER"}
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
            var epic = updateInfo.getItemName().split(":")[1];
            updateInfo.forEachField(function(fieldName, fieldPos, value) {
              console.log('Field: ' + fieldName + " Value: " + value);
              var confirm = JSON.parse(value);
              console.log('json: ' + confirm.dealId)
            });
          }
        });  config.APP.api.lsClient.subscribe(subscription);
      });
    }
  }
});
