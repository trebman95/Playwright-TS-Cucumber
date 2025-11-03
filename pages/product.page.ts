import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

async sortBy(option: string) {

  await this.page.waitForSelector('select[data-test="product-sort-container"]', { state: 'visible' });
  await this.page.selectOption('select[data-test="product-sort-container"]', { label: option });

}

  async areItemsSortedByPrice(option: string): Promise<boolean> {
    // Get all price elements
    const priceElements = await this.page.$$('[data-test="inventory-item-price"]');
    const prices = [];
    for (const el of priceElements) {
      const text = await el.textContent();
      if (text) {
        prices.push(parseFloat(text.replace('$', '')));
      }
    }
    // Check sorting
    const sorted = [...prices].sort((a, b) => option === 'Price (low to high)' ? a - b : b - a);
    return JSON.stringify(prices) === JSON.stringify(sorted);
  }
}