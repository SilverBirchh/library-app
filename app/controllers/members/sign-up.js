import Ember from 'ember';

export default Ember.Controller.extend({

  username: '',
  email:'',
  password: '',
  confirmPassword: '',

  validUsername: Ember.computed.gte('username.length', 5),
  validEmail: Ember.computed.match('email', /^.+@.+\..+$/),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

  isValidUserDetails: Ember.computed.and('validUsername', 'validEmail'),

  isValid: Ember.computed.and('isValidUserDetails', 'validPassword'),

  isDisabled: Ember.computed.not('isValid'),

});
