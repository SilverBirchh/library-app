import Ember from 'ember';
import LightstreamerMixin from '../../../mixins/lightstreamer';
import { module, test } from 'qunit';

module('Unit | Mixin | lightstreamer');

// Replace this with your real tests.
test('it works', function(assert) {
  let LightstreamerObject = Ember.Object.extend(LightstreamerMixin);
  let subject = LightstreamerObject.create();
  assert.ok(subject);
});
