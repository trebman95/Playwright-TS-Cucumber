import { Page, expect } from '@playwright/test';

export class Purchase {
  constructor(private page: Page) {}

  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private successMessage = '.complete-header';
  private firstNameField = '[data-test="firstName"]';
  private lastNameField = '[data-test="lastName"]';
  private postalCodeField = '[data-test="postalCode"]';
  private checkoutButton = '[data-test="checkout"]';

  public async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  public async completePurchase(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, postalCode);
  }

  public async clickContinue() {
    await this.page.click(this.continueButton);
  }

  public async clickFinish() {
    await this.page.click(this.finishButton);
  }

  public async validateSuccessMessage(expectedMessage: string) {
    await expect(this.page.locator(this.successMessage)).toHaveText(expectedMessage);
  }
}