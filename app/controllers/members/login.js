import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({

  username: '',
  password: '',
  isResponseMessage: false,
  responseMessage: '',
  apiKey: config.APP.api.Key,

  validUsername: Ember.computed.gte('username.length', 5),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

  isValid: Ember.computed.and('validUsername', 'validPassword'),

  isDisabled: Ember.computed.not('isValid'),

  actions: {

    loginUser: function() {
      // Get username and password from user interface fields
      var apiKey = config.APP.api.Key;
      var identifier = this.get('username');
      var password = this.get('password');

      var req = {};

      // Set up standard request headers, i.e. the api key, the request content type (JSON),
      // and the expected response content type (JSON)
      req.headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json; charset=UTF-8",
        "X-IG-API-KEY": apiKey,
        "Version": "2"
      };

      // Set up the request body with the user identifier (username) and password
      var bodyParams = {};
      bodyParams["identifier"] = identifier;
      bodyParams["password"] = password;
      bodyParams["encryptedPassword"] = false;
      req.body = JSON.stringify(bodyParams);

      // Send the request via a Javascript AJAX call
      return new Ember.RSVP.Promise((resolve) => {
        Ember.$.ajax({
          type: 'POST',
          url: config.APP.api.session,
          data: req.body,
          headers: req.headers,
          async: false,
          mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
        }).then(function(response, status, data) {
          // Successful login
          console.log("Login Successful");
          var account_token = data.getResponseHeader("X-SECURITY-TOKEN");
          console.log("X-SECURITY-TOKEN: " + account_token);
          var client_token = data.getResponseHeader("CST");
          console.log("CST: " + client_token);
        }, function(e) {
          console.log(e.responseText);
        });
      });
    }
  }
});
