
import { Page } from '@playwright/test';

export class Purchase {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Add backpack to cart
  public async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  // Go to cart
  public async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  // Click checkout button
  public async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  // Fill out checkout information
  public async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  // Continue checkout
  public async clickContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  // Finish order
  public async clickFinish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  // Validate success message
  public async validateSuccessMessage(expectedMessage: string) {
    const message = await this.page.locator('.complete-header').textContent();

    if (message?.trim() !== expectedMessage) {
      throw new Error(`Expected success message "${expectedMessage}" but found "${message}"`);
    }
  }
}
