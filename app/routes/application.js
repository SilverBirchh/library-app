import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  isLoggedIn: '',

  beforeModel: function() {
    config.APP.api.securityToken = sessionStorage.getItem('securityToken') || null;

    config.APP.api.CST = sessionStorage.getItem('CST') || null;

    config.APP.api.lsEndpoint = sessionStorage.getItem('lsEndpoint') || null;

    config.APP.api.activeAccout = sessionStorage.getItem('activeAccout') || null;

    this.set('isLoggedIn', config.APP.api.CST);
    console.log(this.get('isLoggedIn'));
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      isLoggedIn: this.get('isLoggedIn'),
    });
  },

});
