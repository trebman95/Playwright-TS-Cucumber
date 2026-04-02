import { Page } from "@playwright/test";

export class Purchase {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  public async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  public async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  public async continueCheckout() {
    await this.page.locator('[data-test="continue"]').click();
  }

  public async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  public async getConfirmationText(): Promise<string> {
    const text = await this.page.locator('.complete-header').textContent();
    return text ? text.trim() : '';
  }
}
