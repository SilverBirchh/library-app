import Ember from 'ember';
import FindWithAttrMixin from '../../../mixins/find-with-attr';
import { module, test } from 'qunit';

module('Unit | Mixin | find with attr');

// Replace this with your real tests.
test('it works', function(assert) {
  let FindWithAttrObject = Ember.Object.extend(FindWithAttrMixin);
  let subject = FindWithAttrObject.create();
  assert.ok(subject);
});
