import Ember from 'ember';

export default Ember.Controller.extend({

  username: '',
  email:'',
  password: '',
  responseMessage: false,

  signUpLink: 'http://www.ig.com/uk/demo-account',

  validUsername: Ember.computed.gte('username.length', 5),
  validEmail: Ember.computed.match('email', /^.+@.+\..+$/),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

  isValidUserDetails: Ember.computed.and('validUsername', 'validEmail'),

  isValid: Ember.computed.and('isValidUserDetails', 'validPassword'),

  isDisabled: Ember.computed.not('isValid'),

  actions: {

    saveMember() {
      const username = this.get('username');
      const email = this.get('email');
      const password = this.get('password');

      const newMembers = this.store.createRecord('members', {
        name: username,
        email: email,
        password: password
      });

      newMembers.save().then((response) => {
        this.set('responseMessage', true)
        this.set('username', '');
        this.set('email', '');
        this.set('password', '');
      });

    }
  }

});
