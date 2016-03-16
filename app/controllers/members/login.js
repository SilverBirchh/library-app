import Ember from 'ember';

export default Ember.Controller.extend({

  username: '',
  password: '',

  validUsername: Ember.computed.gte('username.length', 5),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

  isValid: Ember.computed.and('validUsername', 'validPassword'),

  isDisabled: Ember.computed.not('isValid'),

  validateUser(username, password) {
    var ref = new Firebase("https://trading-app.firebaseio.com/members");
    var canLogIn = false;
    var queryRef = ref.orderByChild("name").on("child_added", function(snapshot) {
      if (snapshot.val().name === username && snapshot.val().password === password) {
        canLogIn = true;
      }
    });
    return canLogIn;
  },

actions: {

    login() {
      const username = this.get('username');
      const password = this.get('password');
      if (this.validateUser(username, password) == true) {
        console.log("Continue");
        this.transitionToRoute('index');
      } else {
        console.log("Back off");
      }
    },
  },
});
