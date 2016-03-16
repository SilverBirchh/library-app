import Ember from 'ember';

export default Ember.Controller.extend({

  username: '',
  password: '',
  isResponseMessage: false,
  responseMessage: '',


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
      if (this.validateUser(username, password) === true) {
        this.transitionToRoute('index');
        this.set('isResponseMessage', false);
        this.set('responseMessage', ``);
      } else {
        this.set('isResponseMessage', true);
        this.set('responseMessage', `<div class="alert alert-danger" role="alert">
                                      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                        <span class="sr-only">Error:</span>
                                          Enter a valid email address and password
                                          </div>`);
      }
    },
  },
});
