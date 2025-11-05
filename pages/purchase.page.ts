import { expect, Page } from "@playwright/test";

export class PurchasePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', 'secret_sauce');
    await this.page.click('#login-button');
  }

  async addBackpackToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  async clickCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  async clickContinue() {
    await this.page.click('[data-test="continue"]');
  }

  async clickFinish() {
    await this.page.click('[data-test="finish"]');
  }

  async validateOrderConfirmation(expectedText: string) {
    const confirmationMessage = this.page.locator('.complete-header');
    await expect(confirmationMessage).toHaveText(expectedText);
  }
}
