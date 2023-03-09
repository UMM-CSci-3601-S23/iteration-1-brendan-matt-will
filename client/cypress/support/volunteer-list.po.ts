export class FoodShelfVolunteerListPage {
  private readonly baseUrl = '/foodshelfvolunteer';
  private readonly pageTitle = '.user-list-title';
  private readonly homeButtonSelector = `[data-test=account_box]`;
  private readonly sendMessageSelector = '[data-test=addUserButton]';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getFoodShelfVolunteerTitle() {
    return cy.get(this.pageTitle);
  }

  sendMessageButton() {
    return cy.get(this.sendMessageSelector);
  }

  goHomeButton() {
    return cy.get(this.homeButtonSelector);
  }
}
