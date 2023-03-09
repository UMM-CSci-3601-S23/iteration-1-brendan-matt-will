import { FoodShelfDonorListPage } from '../support/donor-list.po';

const page = new FoodShelfDonorListPage();

describe('FoodShelfDonor list', () => {

  before(() => {
    cy.task('seed:database');
  });

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getFoodShelfDonorTitle().should('have.text', 'View messages below! / ¡Vea los mensajes debajo! ');
  });

  it('Should click the go home button', () => {
    page.goHomeButton().click();

//    cy.url().should(url => expect(url.endsWith('/http://localhost:46373/')).to.be.true);
  });

});
