import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Route.extend({
	setupController(controller, model) {
		this._super(controller, model);
		var controller = this.controllerFor('search/account');
		controller.send('getAllAccountDetails');
	},
});
