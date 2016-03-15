import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setLoginInActive(isLoggedIn) {
      var controller = this.controllerFor('members');
      controller.send('setLoginInActive', isLoggedIn);
    }
  }
});
