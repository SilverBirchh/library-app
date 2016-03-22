import Ember from 'ember';
export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {
      console.log("No Session");
    });
  },
  actions: {
    signIn: function(provider) {
      console.log(provider + this.get("session"));
      this.get("session").open("firebase", {
        provider: provider
      }).then(function(data) {
        console.log(data.currentUser);
        this.transitionTo('index');
      }, function(e) {
        console.log(e);
      }).catch(function(error) {
        console.log('error' + error);
      }).finally(function(done) {
        console.log('fin' + done);
      });
      console.log(provider);
    },
    signOut: function() {
      this.get("session").close();
    }
  }
});
