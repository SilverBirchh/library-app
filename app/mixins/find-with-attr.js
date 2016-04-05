import Ember from 'ember';

export default Ember.Mixin.create({
	findIndex(array, field, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][field] === value) {
				return i;
			}
		}
	}
});
