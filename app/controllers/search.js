import Ember from 'ember';
import config from '../config/environment';
import findIndex from '../mixins/find-with-attr';
import findClass from '../mixins/get-updated-class';

export default Ember.Controller.extend(findIndex, findClass, {

	activeAccount: config.APP.api.activeAccout,

	actions: {

	}
});
