import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  itemAddButton = (name: string) => this.page.locator('.inventory_item').filter({ hasText: name }).getByRole('button');
  cartIcon = () => this.page.locator('#shopping_cart_container a');
  sortSelect = () => this.page.locator('[data-test="product-sort-container"]');
  prices = () => this.page.locator('.inventory_item_price');

  async assertOnPage() {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addToCart(name: string) {
    await this.itemAddButton(name).click();
  }

  async openCart() {
    await this.cartIcon().click();
  }

  async sortBy(option: string) {
    await this.sortSelect().selectOption({ label: option });
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.prices().allTextContents();
    return texts.map(t => Number(t.replace('$', '').trim()));
  }
}
