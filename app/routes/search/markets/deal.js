import Ember from 'ember';

export default Ember.Route.extend({
	setupController(controller, model) {
		controller.setProperties({
			direction: false,
			min: 0,
		});
	}
});
