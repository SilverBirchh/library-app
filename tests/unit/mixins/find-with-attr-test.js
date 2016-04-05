import Ember from 'ember';
import FindWithAttrMixin from '../../../mixins/find-with-attr';
import { module, test } from 'qunit';

module('Unit | Mixin | find with attr');

// Replace this with your real tests.
test('it should return a correct index for a real value', function(assert) {
  let FindWithAttrObject = Ember.Object.extend(FindWithAttrMixin);
  let subject = FindWithAttrObject.create();
  let obj1 = {'1':'a','2':'b','3':'c','4':'d'};
  let obj2 = {'1':'w','2':'x','3':'y','4':'z'};
  let obj3 = {'1':'r','2':'s','3':'s','4':'n'};
  let array = [obj1, obj2, obj3];
  let field = '1';
  let value = 'w';
  var index = subject.findIndex(array, field, value);
  assert.equal( 1, index, "Correct Index found" );
});

test('it should return undefined when no inded is found', function(assert) {
  let FindWithAttrObject = Ember.Object.extend(FindWithAttrMixin);
  let subject = FindWithAttrObject.create();
  let obj1 = {'1':'a','2':'b','3':'c','4':'d'};
  let obj2 = {'1':'w','2':'x','3':'y','4':'z'};
  let obj3 = {'1':'r','2':'s','3':'s','4':'n'};
  let array = [obj1, obj2, obj3];
  let field = '1';
  let value = 'zzz';
  var index = subject.findIndex(array, field, value);
  assert.equal( null, index, "No index. Pass" );
});
