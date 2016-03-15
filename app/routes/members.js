import Ember from 'ember';

export default Ember.Route.extend({

  isLogin: true,

  actions: {
    setLoginInActive(isLoggedIn) {
      var controller = this.controllerFor('members');
      controller.send('setLoginInActive', isLoggedIn);
    }
  }
});
