
import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page

    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select[data-test="product-sort-container"]'
    private readonly itemPrices: string = '.inventory_item_price'
    
    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortByPrice(sortOption: string) {
    const valueMap: Record<string, string> = {
      'Price (low to high)': 'lohi',
      'Price (high to low)': 'hilo',
    };
    const optionValue = valueMap[sortOption];
    if (!optionValue) {
      throw new Error(`Unsupported sort option: ${sortOption}`);
    }
    await this.page.locator(this.sortDropdown).selectOption(optionValue);
  }

  public async validateSortedByPrice(order: 'asc' | 'desc') {
    const priceTexts = await this.page
      .locator(this.itemPrices)
      .allTextContents();
    const prices = priceTexts.map((price) =>
      parseFloat(price.replace('$', ''))
    );
    expect(prices).toHaveLength(6)
    const expected = [...prices].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );
    expect(prices).toEqual(expected);
  }
}