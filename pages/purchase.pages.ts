import { Page } from '@playwright/test';

export class PurchasePage {
  constructor(private page: Page) {}

  async addBackpackToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  async clickCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  async fillCheckoutInfo() {
    await this.page.fill('[data-test="firstName"]', 'John');
    await this.page.fill('[data-test="lastName"]', 'Doe');
    await this.page.fill('[data-test="postalCode"]', '12345');
  }

  async clickContinue() {
    await this.page.click('[data-test="continue"]');
  }

  async clickFinish() {
    await this.page.click('[data-test="finish"]');
  }

  async getSuccessText() {
    return this.page.locator('.complete-header').textContent();
  }
}
