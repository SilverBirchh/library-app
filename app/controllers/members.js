import Ember from 'ember';

export default Ember.Controller.extend({

  isLogin: true,


  actions: {
    setLoginInActive(isLoggedIn) {
      this.set('isLogin', isLoggedIn);
    },
  }
  });
