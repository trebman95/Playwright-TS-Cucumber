import { Page } from '@playwright/test';

export class Product {
  constructor(private page: Page) {}

  async addBackPackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async clickCartIcon() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async sortBy(sortType: string) {
    await this.page.waitForSelector('[data-test="product-sort-container"]', { timeout: 10000 });
    await this.page.selectOption('[data-test="product-sort-container"]', { label: sortType });
  }

  async getPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allInnerTexts();
    return priceTexts.map((text) => parseFloat(text.replace('$', '')));
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if ((await badge.count()) === 0) return 0;
    return parseInt((await badge.textContent()) ?? '0', 10);
  }
}
