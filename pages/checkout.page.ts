import { Page } from "@playwright/test";

export class Checkout {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async checkout() {
    await this.page.locator('#checkout').click();
  }

  async enterUserInfo(first: string, last: string, zip: string) {
    await this.page.locator('#first-name').fill(first);
    await this.page.locator('#last-name').fill(last);
    await this.page.locator('#postal-code').fill(zip);
    await this.page.locator('#continue').click();
  }

  async finishPurchase() {
    await this.page.locator('#finish').click();
  }

  async validateConfirmation(expected: string) {
    const actual = await this.page.locator('.complete-header').innerText();
    if (actual.trim() !== expected) {
      throw new Error(`Expected "${expected}" but got "${actual}"`);
    }
  }
}