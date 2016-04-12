import Ember from 'ember';
import SubscribeToStreamMixin from '../../../mixins/subscribe-to-stream';
import { module, test } from 'qunit';

module('Unit | Mixin | subscribe to stream');

// Replace this with your real tests.
test('it works', function(assert) {
  let SubscribeToStreamObject = Ember.Object.extend(SubscribeToStreamMixin);
  let subject = SubscribeToStreamObject.create();
  assert.ok(subject);
});
