import { Page } from "@playwright/test";

export class Checkout {
  constructor(private readonly page: Page) {}

  async continue() {
    await this.page.click('[data-test="continue"]');
  }

  async finish() {
    await this.page.click('[data-test="finish"]');
  }
}