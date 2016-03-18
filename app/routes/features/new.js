import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.createRecord('feature');
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('title', 'Create a new feature');
    controller.set('buttonLabel', 'Create');
  },

  renderTemplate() {
    this.render('features/form');
  },

  actions: {

    saveFeature(newFeature) {
      newFeature.save().then(() => this.transitionTo('features'));
    },

    willTransition() {
      let model = this.controller.get('model');

      if (model.get('isNew')) {
        model.destroyRecord();
      }
    }
  }
});
