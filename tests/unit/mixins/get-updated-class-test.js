import Ember from 'ember';
import GetUpdatedClassMixin from '../../../mixins/get-updated-class';
import { module, test } from 'qunit';

module('Unit | Mixin | get updated class');

// Replace this with your real tests.
test('it works', function(assert) {
  let GetUpdatedClassObject = Ember.Object.extend(GetUpdatedClassMixin);
  let subject = GetUpdatedClassObject.create();
  assert.ok(subject);
});
