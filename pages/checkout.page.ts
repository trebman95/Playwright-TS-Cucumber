import { Page } from '@playwright/test';

export class Checkout {

  constructor(private page: Page) {}

  private firstName = '[data-test="firstName"]';
  private lastName = '[data-test="lastName"]';
  private postalCode = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';

  public async fillInformation(first: string, last: string, zip: string) {
    await this.page.fill(this.firstName, first);
    await this.page.fill(this.lastName, last);
    await this.page.fill(this.postalCode, zip);
  }

  public async continue() {
    await this.page.click(this.continueButton);
  }
}
