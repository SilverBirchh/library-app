import Ember from 'ember';

export default Ember.Route.extend({
	setupController(controller, model) {
		this._super(controller, model);
		var controller = this.controllerFor('search/account');
		controller.send('getAcountDetails');
		controller.send('getAllAccountDetails');
	},
});
