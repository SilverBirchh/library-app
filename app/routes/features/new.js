import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('feature');
  },

  actions: {

    saveFeature(newFeature) {
      newFeature.save().then(() => this.transitionTo('features'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
