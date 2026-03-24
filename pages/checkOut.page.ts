import { Page } from "@playwright/test"
import { expect } from '@playwright/test';
// pages/CheckoutPage.js
export class CheckoutPage {
    private readonly page: Page
    private readonly firstNameInput = '[data-test="firstName"]';
    private readonly lastNameInput = '[data-test="lastName"]';
    private readonly postalCodeInput = '[data-test="postalCode"]';
    private readonly continueButton = '[data-test="continue"]';
    private readonly finishButton = '[data-test="finish"]';
    private readonly successMessage = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

  public async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async finishPurchase() {
    await this.page.click(this.finishButton);
  }

  async getSuccessMessage() {
    return await this.page.textContent(this.successMessage);
  }
}