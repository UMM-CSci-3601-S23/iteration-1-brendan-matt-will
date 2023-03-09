export class FoodShelfClientListPage {
  private readonly baseUrl = '/foodshelfclient';
  private readonly pageTitle = '.user-list-title';
  private readonly homeButtonSelector = `[data-test=account_box]`;
  private readonly sendMessageSelector = '[data-test=addUserButton]';

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getFoodShelfClientTitle() {
    return cy.get(this.pageTitle);
  }

  sendMessageButton() {
    return cy.get(this.sendMessageSelector);
  }

  goHomeButton() {
    return cy.get(this.homeButtonSelector);
  }
}
