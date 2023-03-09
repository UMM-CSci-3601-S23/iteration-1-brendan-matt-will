import { FoodShelfClientListPage } from '../support/client-list.po';

const page = new FoodShelfClientListPage();

describe('FoodShelfClient list', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getFoodShelfClientTitle().should('have.text', 'Send a message to the food shelf!/ Enviar un mensaje a la estanteria de alimentos');
  });

  it('Should click the send message button', () => {
    page.sendMessageButton().click();

    cy.url().should(url => expect(url.endsWith('/new')).to.be.true);
  });

  it('Should click the go home button', () => {
    page.goHomeButton().click();
  });

});
