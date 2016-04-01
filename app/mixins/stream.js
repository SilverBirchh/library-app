import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  startStream() {
    console.log('Init streamer');
    // Instantiate Lightstreamer client instance
    let lsClient = new Lightstreamer.LightstreamerClient(config.APP.api.lsEndpoint, 'InVisionProvider');
    console.log('lsclient retrieved');
    // Set up login credentials
    lsClient.connectionDetails.setUser(config.APP.api.activeAccout);
    lsClient.connectionDetails.setPassword("CST-" + config.APP.api.CST + "|XST-" + config.APP.api.securityToken);

    // Add connection event listener callback functions
    // Note: the Lightstreamer library will transparently attempt to reconnect a number of times
    // in the event of communicationss errors
    lsClient.addListener({
      onListenStart: function() {
        console.log('ListenStart');
      },
      onStatusChange: function(status) {
        console.log('Lightstreamer connection status:' + status);
      }
    });
    // Connect to Lightstreamer
    lsClient.connect();
  }
});
