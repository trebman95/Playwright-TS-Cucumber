import { Page } from "@playwright/test";

export class PurchasePage {
     private readonly first_name: string = 'input[id="first-name"]'
    private readonly last_name: string = 'input[id="last-name"]'
    private readonly zipcode: string = 'input[id="postal-code"]'
  constructor(private readonly page: Page) {}

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.first_name, firstName);
    await this.page.fill(this.last_name, lastName);
    await this.page.fill(this.zipcode, postalCode);
  }

  async clickContinue() {
    await this.page.click('[data-test="continue"]');
  }

  async clickFinish() {
    await this.page.click('[data-test="finish"]');
  }

  async getConfirmationText() {
    return this.page.textContent('.complete-header');
  }
}