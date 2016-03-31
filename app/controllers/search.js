import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  market: '',
  validSearch: Ember.computed.gte('market.length', 3),
  isDisabled: Ember.computed.not('validSearch'),

  actions: {
    search() {
      let search = this.get('market');
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
          $('#search_results_list tbody').empty();

          for (var i = 0; i < response.markets.length; i++) {
            var marketsData = response.markets[i];
            var epic = marketsData.epic;
            var canSubscribe = marketsData.streamingPricesAvailable;
            var tidyEpic = epic.replace(/\./g, "_");
            var expiry = marketsData.expiry.replace(/ /g, "");
            var linkId = "searchResult_" + tidyEpic;
            var state = null;
            if (marketsData.marketStatus === 'EDITS_ONLY') {
              state = 'assets/images/edit.png';
            } else if (marketsData.marketStatus === 'TRADEABLE') {
              state = 'assets/images/open.png';
            } else {
              state = 'assets/images/close.png';
            }

            $('#search_results_list tbody:last')
              .append($('<tr>')
                .append($('<td>')
                  .append($('<img>')
                    .attr("id", "search_" + tidyEpic + "_MARKET_STATE")
                    .attr("src", state)))
                .append(
                  $('<td>')
                  .append($('<a>')
                    .attr("id", linkId)
                    .append(marketsData.instrumentName))
                )
                .append($('<td>')
                  .append(expiry))
                .append($('<td>')
                  .attr("id", "search_" + tidyEpic + "_BID")
                  .append(marketsData.bid))
                .append($('<td>')
                  .attr("id", "search_" + tidyEpic + "_OFFER")
                  .append(marketsData.offer))
              );
          }
        },
        function(e) {
          console.log(e.responseText);
        });

    }
  }
});
