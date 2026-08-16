import { Page } from '@playwright/test';

export class Checkout {
  constructor(private page: Page) {}

  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async enterInfo(first: string, last: string, zip: string) {
    await this.page.fill('[data-test="firstName"]', first);
    await this.page.fill('[data-test="lastName"]', last);
    await this.page.fill('[data-test="postalCode"]', zip);
  }

  async clickContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async clickFinish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async getConfirmationMessage() {
    return this.page.textContent('.complete-header');
  }

  async getOverviewItemNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allInnerTexts();
  }

  async getOverviewSubtotal() {
    return this.page.textContent('[data-test="subtotal-label"]');
  }

  async getOverviewTax() {
    return this.page.textContent('[data-test="tax-label"]');
  }

  async getOverviewTotal() {
    return this.page.textContent('[data-test="total-label"]');
  }
}
