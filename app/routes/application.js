import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  isLoggedIn: config.APP.api.CST || null,

  beforeModel: function() {

  },

  setupController(controller, model) {
    this._super(controller, model);
    let isLoggedIn = sessionStorage.getItem('CST') || null;
    console.log(isLoggedIn);
  },

});
