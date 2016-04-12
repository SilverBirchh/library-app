import Ember from 'ember';
import ConfirmDealMixin from '../../../mixins/confirm-deal';
import { module, test } from 'qunit';

module('Unit | Mixin | confirm deal');

// Replace this with your real tests.
test('it works', function(assert) {
  let ConfirmDealObject = Ember.Object.extend(ConfirmDealMixin);
  let subject = ConfirmDealObject.create();
  assert.ok(subject);
});
