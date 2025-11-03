import { Page } from "@playwright/test";

export class Cart {
  constructor(private readonly page: Page) {}

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }
}