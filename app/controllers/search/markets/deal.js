import Ember from 'ember';
import confirm from '../../../mixins/confirm-deal';

export default Ember.Controller.extend(confirm, {
	result: {},
	direction: false,
	min: 0,
	vaildMin: Ember.computed.gte('min', 1),
	marketSeleted: false,

	isValidInput: Ember.computed.and('direction', 'vaildMin'),
	isValid: Ember.computed.and('marketSeleted', 'isValidInput'),
	isDisabled: Ember.computed.not('isValid'),

	actions: {
		setMarketDetails(result) {
			this.set('result', result);
			this.set('marketSeleted', true);
		},
		decideDirection(direction) {
			var buy = document.getElementById('buy');
			var sell = document.getElementById('sell');
			this.set('direction', direction);

			if (direction === 'buy') {
				$(buy).addClass("btn-danger");
				$(sell).removeClass("btn-primary");
				return;
			}
			$(sell).addClass("btn-primary");
			$(buy).removeClass("btn-danger");
		},
		deal() {
			var that = this;
			var apiKey = sessionStorage.getItem('apikey');
			var securityToken = sessionStorage.getItem('securityToken');
			var cst = sessionStorage.getItem('CST');
			var direction = this.get('direction');
			var size = this.get('min');
			var market = this.get('result');

			var req = {};
			req.headers = {
				"Content-Type": "application/json; charset=UTF-8",
				"Accept": "application/json; charset=UTF-8",
				"X-IG-API-KEY": apiKey,
				"Version": "2",
				"X-SECURITY-TOKEN": securityToken,
				"CST": cst
			};

			var bodyParams = {};
			bodyParams["epic"] = market.epic;
			bodyParams["expiry"] = market.expiry;
			bodyParams["direction"] = direction.toUpperCase();
			bodyParams["size"] = size;
			bodyParams["orderType"] = 'MARKET';
			bodyParams["timeInForce"] = null;
			bodyParams["level"] = null;
			bodyParams["guaranteedStop"] = false;
			bodyParams["stopLevel"] = null;
			bodyParams["stopDistance"] = null;
			bodyParams["trailingStop"] = false;
			bodyParams["trailingStopIncrement"] = null;
			bodyParams["forceOpen"] = false;
			bodyParams["limitLevel"] = null;
			bodyParams["limitDistance"] = null;
			bodyParams["quoteId"] = null;
			bodyParams["currencyCode"] = 'GBP';
			req.body = JSON.stringify(bodyParams);

			Ember.$.ajax({
				type: 'POST',
				url: 'https://demo-api.ig.com/gateway/deal/positions/otc',
				data: req.body,
				headers: req.headers,
				async: false,
				mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
			}).then(function(response, status, data) {
				that.confirm(response.dealReference);
			}, function(e) {
				console.log(e);
			});


		}
	}
});
