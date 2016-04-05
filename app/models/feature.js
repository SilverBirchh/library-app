import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  contact: DS.attr('string'),

  isValid: Ember.computed.notEmpty('name'),

  shouldReloadAll() {
    return true;
  },
});
