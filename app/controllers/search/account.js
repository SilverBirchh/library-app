import Ember from 'ember';
import config from '../../config/environment';


export default Ember.Controller.extend({
	activeAccount: config.APP.api.activeAccout,
	account: {'Equity': 'NA', 'pnl': 'NA', 'funds': 'NA', 'margin': 'NA', 'avaliable': 'NA'},

	actions: {
		getAcountDetails() {

		}
	}
});
