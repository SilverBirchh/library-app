import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('feature');
  },

  actions: {

    deleteFeature(feature) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        feature.destroyRecord();
      }
    }
  }
});
