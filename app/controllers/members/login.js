import Ember from 'ember';

export default Ember.Controller.extend({

  username: '',
  password: '',


  validUsername: Ember.computed.gte('username.length', 5),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),


  isValid: Ember.computed.and('validUsername', 'validPassword'),

  isDisabled: Ember.computed.not('isValid'),

});
