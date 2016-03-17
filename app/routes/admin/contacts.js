import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('feedback');
  },

  actions: {

    deleteFeedback(feedback) {
      let confirmation = confirm('Are you sure?');

      if (confirmation) {
        feedback.destroyRecord();
      }
    }
  }


});
