import Ember from 'ember';

export default Ember.Route.extend({

  activate() {
    this.send("setLoginInActive", false);
  },

  setupController(controller, model) {
    //controller.set('model', model);
    controller.setProperties({
      responseMessage: false,
    });
  }
});
