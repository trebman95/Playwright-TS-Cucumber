import { Page } from '@playwright/test';

export class Cart {
  constructor(private page: Page) {}

  async getItemNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allInnerTexts();
  }

  async getItemCount(): Promise<number> {
    return this.page.locator('.cart_item').count();
  }
}
