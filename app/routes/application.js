import Ember from 'ember';
import config from '../config/environment';
import stream from '../mixins/stream';


export default Ember.Route.extend(stream, {
  isLoggedIn: '',

  beforeModel: function() {
    config.APP.api.securityToken = sessionStorage.getItem('securityToken') || null;

    config.APP.api.CST = sessionStorage.getItem('CST') || null;

    config.APP.api.lsEndpoint = sessionStorage.getItem('lsEndpoint') || null;

    config.APP.api.activeAccout = sessionStorage.getItem('activeAccout') || null;

    config.APP.api.lsClient = sessionStorage.getItem('lsClient') || null;

    config.APP.api.Key = sessionStorage.getItem('apikey') || null;

    this.set('isLoggedIn', config.APP.api.CST);
    this.startStream();
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      isLoggedIn: this.get('isLoggedIn'),
    });
  },

  actions: {
    signOut: function() {
      sessionStorage.clear();
      this.set('isLoggedIn', null);
      location.reload();
    }
  },

});
