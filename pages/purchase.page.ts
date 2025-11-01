import { Page, expect } from "@playwright/test";

export class Purchase {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async checkout(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="checkout"]').click();
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  public async finishPurchase() {
    await this.page.locator('[data-test="finish"]').click();
  }

  public async validateSuccessMessage(expected: string) {
    const message = await this.page.locator('.complete-header').innerText();
    expect(message.trim()).toBe(expected);
  }
}
