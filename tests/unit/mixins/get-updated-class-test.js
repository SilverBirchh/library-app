import Ember from 'ember';
import GetUpdatedClassMixin from '../../../mixins/get-updated-class';
import { module, test } from 'qunit';

module('Unit | Mixin | get updated class');

test('Higher class is retrieved', function(assert) {
  let GetUpdatedClassObject = Ember.Object.extend(GetUpdatedClassMixin);
  let subject = GetUpdatedClassObject.create();
  let obj = {'bid': 123};
  let value = 125;
  let newClass = subject.getNewClass(obj, 'bid', value);
  assert.equal('updatedValueHigher', newClass);
});

test('Lower class is retrieved', function(assert) {
  let GetUpdatedClassObject = Ember.Object.extend(GetUpdatedClassMixin);
  let subject = GetUpdatedClassObject.create();
  let obj = {'bid': 123};
  let value = 120;
  let newClass = subject.getNewClass(obj, 'bid', value);
  assert.equal('updatedValueLower', newClass);
});
