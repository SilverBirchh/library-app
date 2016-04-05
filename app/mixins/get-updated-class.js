import Ember from 'ember';

export default Ember.Mixin.create({
	getNewClass(obj, field, value) {
		if (obj[field] > value) {
			return "updatedValueLower";
		} else {
			return "updatedValueHigher";
		}
	}
});
