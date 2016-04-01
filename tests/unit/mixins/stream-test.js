import Ember from 'ember';
import StreamMixin from '../../../mixins/stream';
import { module, test } from 'qunit';

module('Unit | Mixin | stream');

// Replace this with your real tests.
test('it works', function(assert) {
  let StreamObject = Ember.Object.extend(StreamMixin);
  let subject = StreamObject.create();
  assert.ok(subject);
});
