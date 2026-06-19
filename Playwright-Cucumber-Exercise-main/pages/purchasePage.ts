import { expect, Page, Locator } from '@playwright/test';

export class PurchasePage {
  private page: Page;

  private completeHeader: Locator;
  private completeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeMessage = page.locator('.complete-text'); 
  }

  async clickCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async clickCheckout() {
    await this.page.locator('#checkout').click();
  }

  async fillDetails(firstName: string, lastName: string, zip: string) {
    await this.page.locator('#first-name').fill(firstName);
    await this.page.locator('#last-name').fill(lastName);
    await this.page.locator('#postal-code').fill(zip);
  }

  async clickContinue() {
    await this.page.locator('#continue').click();
  }

  async clickFinish() {
    await this.page.locator('#finish').click();
  }

  async validateConfirmation(expectedText: string) {
    await expect(this.completeHeader).toHaveText(expectedText);
  }

  getConfirmationHeader(): Locator {
    return this.completeHeader;
  }

  getConfirmationMessage(): Locator {
    return this.completeMessage;
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}