module.exports = function(environment) {
    var ENV = {
    modulePrefix: 'library-app',
    environment: environment,
    contentSecurityPolicy: {
      'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com"
    },
    // Create your own app on Firebase.com and update this line accordingly.
    firebase: 'https://trading-app.firebaseio.com/',
    torii: {
      sessionServiceName: 'session'
    },
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      api: {
        Key: 'ecdf28c91bbbb43b4ecdfb5491aa164dd3ea5246',
        session: 'https://demo-api.ig.com/gateway/deal/session',
        CST: '',
        securityToken: '',
        lsEndpoint: '',
        activeAccout: '',
      },
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    //ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV['ember-faker'] = {
      enabled: true
    };
  }

  return ENV;
};
