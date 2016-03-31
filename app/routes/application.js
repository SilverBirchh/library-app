import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {
      console.log("No Session");
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
  },



});
