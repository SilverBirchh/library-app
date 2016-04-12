import Ember from 'ember';

export default Ember.Mixin.create({
	confirm(dealRef) {
		var req = {};
		req.method = "GET";
		req.url = "https://demo-api.ig.com/gateway/deal/confirms/" + dealRef;
		req.headers = {
			"X-IG-API-KEY": sessionStorage.getItem('apikey'),
			"X-SECURITY-TOKEN": sessionStorage.getItem('securityToken'),
			"CST": sessionStorage.getItem('CST'),
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8",
			"Version": "1"
		};
		req.body = "";
		$.ajax({
			type: req.method,
			url: req.url,
			data: req.body,
			headers: req.headers,
			async: false,
			mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null,
			error: function(response, status, error) {
				console.log(response);
			},
			success: function(response, status, data) {
				console.log(response);
			}
		});
	},
});
