import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('contact');

  this.route('admin', function() {
    this.route('invitations');
    this.route('contacts');
  });

  this.route('features', function() {
    this.route('new');
    this.route('edit', { path: '/:feature_id/edit' });
  });

  this.route('members', function() {
    this.route('login');
    this.route('sign-up');
  });
  this.route('search');
});

export default Router;
