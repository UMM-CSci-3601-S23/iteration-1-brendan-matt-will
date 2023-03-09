import { FoodShelfVolunteerListPage } from '../support/volunteer-list.po';

const page = new FoodShelfVolunteerListPage();

describe('FoodShelfVolunteer list', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    // eslint-disable-next-line max-len
    page.getFoodShelfVolunteerTitle().should('have.text', 'Send a message to the food shelf!/ Enviar un mensaje a la estanteria de alimentos');
  });

  it('Should click the send message button', () => {
    page.sendMessageButton().click();

//    cy.url().should(url => expect(url.endsWith('/foodshelfvolunteer/new')).to.be.true);
  });

  it('Should click the go home button', () => {
    page.goHomeButton().click();

//    cy.url().should(url => expect(url.endsWith('/http://localhost:46373/')).to.be.true);
  });

});
