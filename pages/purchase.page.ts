import { Page, expect } from '@playwright/test';

export class PurchasePage {
  constructor(private page: Page) {}

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async checkoutCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await this.page.locator('[data-test="checkout"]').click();
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishPurchase() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async validatePurchaseCompleteMessage(expectedMessage: string) {
    const confirmationMessage = this.page.locator('[data-test="complete-header"]');
    await expect(confirmationMessage).toBeVisible();
    await expect(confirmationMessage).toHaveText(expectedMessage);
  }
}