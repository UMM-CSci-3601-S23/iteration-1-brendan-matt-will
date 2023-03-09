import { Message } from 'src/app/FoodShelfClient/message';
import { AddMessagePage } from '../support/add-message.po';

describe('Add message', () => {
  const page = new AddMessagePage();

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTitle().should('have.text', 'New Message');
  });

  it('Should enable and disable the add message button', () => {
    // ADD USER button should be disabled until all the necessary fields
    // are filled. Once the last (`#emailField`) is filled, then the button should
    // become enabled.
    page.addMessageButton().should('be.disabled');
    page.getFormField('name').type('Brendan');
    page.addMessageButton().should('be.disabled');
    page.getFormField('body').type('bean');
    page.addMessageButton().should('be.disabled');
    page.getFormField('body').type('I want a bean please');
    // all the required fields have valid input, then it should be enabled
    page.addMessageButton().should('be.enabled');
  });

  describe('Adding a new message', () => {

    beforeEach(() => {
      cy.task('seed:database');
    });

    it('Should go to the right page, and have the right info', () => {
      const message: Message = {
        _id: null,
        name: 'Brendan',
        body: 'I want beans please',
      };

      page.addMessage(message);

      // Checks that after the message is added, we go back to the client page
      cy.url()
      .should('match', /\/foodshelfclient\/new$/);
    });

    it('Should fail with short body', () => {
      const message: Message = {
        _id: null,
        name: 'Test User',
        body: 'bean',
      };

      page.addMessage(message);

      // We should have stayed on the new user page
      cy.url()
        .should('match', /\/foodshelfclient\/new$/);

      // The things we entered in the form should still be there
      page.getFormField('name').should('have.value', message.name);
    });
  });

});
