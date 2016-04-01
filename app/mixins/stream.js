import Ember from 'ember';
import config from '../config/environment';

export default Ember.Mixin.create({
  startStream() {
    console.log('Init streamer');
    // Instantiate Lightstreamer client instance
    let lsClient = new Lightstreamer.LightstreamerClient(config.APP.api.lsEndpoint, 'InVisionProvider');
    config.APP.api.lsClient = lsClient;
    console.log(lsClient);
    // Set up login credentials
    config.APP.api.lsClient.connectionDetails.setUser(config.APP.api.activeAccout);
    config.APP.api.lsClient.connectionDetails.setPassword("CST-" + config.APP.api.CST + "|XST-" + config.APP.api.securityToken);

    // Add connection event listener callback functions
    // Note: the Lightstreamer library will transparently attempt to reconnect a number of times
    // in the event of communicationss errors
    config.APP.api.lsClient.addListener({
      onListenStart: function() {
        console.log('ListenStart');
      },
      onStatusChange: function(status) {
        console.log('Lightstreamer connection status:' + status);
      }
    });
    // Connect to Lightstreamer
    config.APP.api.lsClient.connect();
  }
});
