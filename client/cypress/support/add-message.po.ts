import { Message } from 'src/app/FoodShelfClient/message';

export class AddMessagePage {
  private readonly url = '/foodshelfclient/new';
  private readonly title = '.add-message-title';
  private readonly button = '[data-test=confirmAddMessageButton]';
  private readonly snackBar = '.mat-mdc-simple-snack-bar';
  private readonly nameFieldName = 'name';
  private readonly bodyFieldName = 'body';
  private readonly formFieldSelector = `mat-form-field`;
  private readonly dropDownSelector = `mat-option`;

  navigateTo() {
    return cy.visit(this.url);
  }

  getTitle() {
    return cy.get(this.title);
  }

  addMessageButton() {
    return cy.get(this.button);
  }

  // selectMatSelectValue(select: Cypress.Chainable, value: string) {
  //   // Find and click the drop down
  //   return select.click()
  //     // Select and click the desired value from the resulting menu
  //     .get(`${this.dropDownSelector}[value="${value}"]`).click();
  // }

  getFormField(fieldName: string) {
    return cy.get(`${this.formFieldSelector} [formcontrolname=${fieldName}]`);
  }

  getSnackBar() {
    return cy.get(this.snackBar);
  }

  addMessage(newMessage: Message) {
    this.getFormField(this.bodyFieldName).type(newMessage.body);
    if (newMessage.name) {
      this.getFormField(this.nameFieldName).type(newMessage.name);
    }
  }
}
