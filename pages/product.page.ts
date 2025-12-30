import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
}

export class ProductPage {
  constructor(private page: Page) {}

  async sortBy(sortOption: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption({
      label: sortOption,
    });
  }

  async validateProductsSortedByPrice(order: 'asc' | 'desc') {
    const priceTexts = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    expect(priceTexts.length).toBe(6);

    const prices = priceTexts.map(price =>
      parseFloat(price.replace('$', ''))
    );

    const sortedPrices = [...prices].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );

    expect(prices).toEqual(sortedPrices);
  }
}