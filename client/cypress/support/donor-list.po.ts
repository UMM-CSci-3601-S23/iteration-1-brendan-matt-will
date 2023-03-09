export class FoodShelfDonorListPage {
  private readonly baseUrl = '/foodshelfdonor';
  private readonly pageTitle = '.message-list-title';
  private readonly homeButtonSelector = `[data-test=account_box]`;

  navigateTo() {
    return cy.visit(this.baseUrl);
  }

  getFoodShelfDonorTitle() {
    return cy.get(this.pageTitle);
  }

  goHomeButton() {
    return cy.get(this.homeButtonSelector);
  }
}
