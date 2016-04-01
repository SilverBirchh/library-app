import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({

  username: '',
  password: '',
  hasResponseMessage: false,
  apiKey: config.APP.api.Key,

  validUsername: Ember.computed.gte('username.length', 5),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

  isValid: Ember.computed.and('validUsername', 'validPassword'),

  isDisabled: Ember.computed.not('isValid'),

  actions: {

    login: function() {
      // Get username and password from user interface fields
      var apiKey = config.APP.api.Key;
      var identifier = this.get('username');
      var password = this.get('password');
      let that = this;

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
      Ember.$.ajax({
        type: 'POST',
        url: config.APP.api.session,
        data: req.body,
        headers: req.headers,
        async: false,
        mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
      }).then(function(response, status, data) {
        // Successful login
        console.log('Successful login');
        config.APP.api.securityToken = data.getResponseHeader("X-SECURITY-TOKEN");
        sessionStorage.setItem('securityToken', config.APP.api.securityToken);

        config.APP.api.CST = data.getResponseHeader("CST");
        sessionStorage.setItem('CST', config.APP.api.CST);

        config.APP.api.lsEndpoint = response.lightstreamerEndpoint;
        sessionStorage.setItem('lsEndpoint', config.APP.api.lsEndpoint);

        config.APP.api.activeAccout = response.currentAccountId;
        sessionStorage.setItem('activeAccout', config.APP.api.activeAccout);
        that.set('isLoggedIn', true);
        that.transitionToRoute('/search');
        location.reload();
      }, function(e) {
        that.set('hasResponseMessage', true);
        console.log(e.responseText);

      });
    }
  }
});
