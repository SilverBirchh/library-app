import Ember from 'ember';

export default Ember.Controller.extend({
  emailAddress: '',
  responseMessage: '',
  thankYouMessage: '',

  validEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  validMessage: Ember.computed.gte('responseMessage.length', 5),


  isValid: Ember.computed.and('validEmail', 'validMessage'),

  isDisabled: Ember.computed.not('isValid'),

  actions: {

    saveInvitation() {
        const email = this.get('emailAddress');
        const message = this.get('responseMessage');

        const newInvitation = this.store.createRecord('feedback', { email: email, message: message });
        newInvitation.save().then((response) => {

          this.set('thankYouMessage', `
                <div class="row">
                      <div class="col-md-12">
                          <br>
                          <div class="alert alert-success">
                              <h4>Thank you! Your message has been received. We greatly appreciate any messages.</h4>
                              <p>Email: ${this.get('emailAddress')}</p>
                              <p>Message: ${this.get('responseMessage')}</p>
                          </div>
                      </div>
                  </div>`);
          this.set('emailAddress', '');
          this.set('responseMessage', '');
        });
    }
  }

});
