import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {
      console.log("No Session");
    });
  },

  adminId: 'google:105960574220142702485',
  isAdmin: Ember.computed('adminId', function() {
    return this.get('session.uid') == this.get('adminId');
  }),

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('isAdmin', `${this.get('isAdmin')}`),

    controller.set('footerText', `Logged in as
      ${this.get('session.currentUser.displayName')}
      with a unique ID of
      ${this.get('session.uid')}`);
  },

  actions: {
    signIn: function(provider) {
      console.log(provider + this.get("session"));
      this.get("session").open("firebase", {
        provider: provider
      }).then(function(data) {
        console.log(data.currentUser);
      }, function(e) {
        console.log(e);
      }).catch(function(error) {
        console.log('error ' + error);
      }).finally(function(done) {
        console.log('fin ' + done);
      });
      console.log(provider);
    },
    signOut: function() {
      this.get("session").close().catch(function(error) {
        console.log('error ' + error);
      });
    }
  }
});
