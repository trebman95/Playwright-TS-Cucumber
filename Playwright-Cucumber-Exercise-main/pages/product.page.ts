import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectSortOption(sortOption: string) {
    await this.page.selectOption('.product_sort_container', {
      label: sortOption,
    });
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = this.page.locator('.inventory_item_price');
    const count = await priceElements.count();

    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const text = await priceElements.nth(i).innerText();
      prices.push(parseFloat(text.replace('$', '')));
    }

    return prices;
  }

  async validateProductSorting(sortOption: string) {
    const actualPrices = await this.getProductPrices();

    // Create a sorted copy
    const sortedPrices = [...actualPrices];

    if (sortOption === 'Price (low to high)') {
      sortedPrices.sort((a, b) => a - b);
    } else if (sortOption === 'Price (high to low)') {
      sortedPrices.sort((a, b) => b - a);
    }

    // Validate all 6 items are sorted correctly
    expect(actualPrices.length).toBe(6);
    expect(actualPrices).toEqual(sortedPrices);
  }
}