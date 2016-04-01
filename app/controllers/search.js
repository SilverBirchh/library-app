import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  market: '',
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
            that.get('results').addObject(marketsData);
          }
        },
        function(e) {
          console.log(e.responseText);
        });
    }
  }
});
