import { Page } from "@playwright/test";

export class Product {
  private readonly page: Page;

  private readonly addToCart = 'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly priceLocator = '.inventory_item_price';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async sortBy(value: string) {
    await this.page.locator(this.sortDropdown).selectOption(value);
  }

  public async getAllPrices(): Promise<number[]> {
    const pricesText = await this.page.locator(this.priceLocator).allInnerTexts();
    return pricesText.map(p => Number(p.replace('$', '').trim()));
  }

  public async validatePricesSorted(order: 'asc' | 'desc') {
    const prices = await this.getAllPrices();
    const sorted = [...prices].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );

    if (JSON.stringify(prices) !== JSON.stringify(sorted)) {
      throw new Error(
        `Prices are not sorted correctly.\nActual: ${prices}\nExpected: ${sorted}`
      );
    }
  }
}
