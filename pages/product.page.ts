import { Page } from "@playwright/test";

export class ProductPage {
  constructor(private readonly page: Page) {}

  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly productPrices = '.inventory_item_price';

  async sortProductsBy(option: string) {
    // Select sorting option by visible label (e.g., "Price (low to high)")
    await this.page.locator(this.sortDropdown).selectOption({ label: option });
  }

  async getDisplayedPrices(): Promise<number[]> {
    // Get all price texts (e.g. "$29.99") and convert to float
    const priceElements = await this.page.locator(this.productPrices).allTextContents();
    return priceElements.map((priceText) =>
      parseFloat(priceText.replace("$", "").trim())
    );
  }

  async isSortedAscending(prices: number[]): Promise<boolean> {
    // Check that every price is <= the next one
    return prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
  }

  async isSortedDescending(prices: number[]): Promise<boolean> {
    // Check that every price is >= the next one
    return prices.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
  }
}
