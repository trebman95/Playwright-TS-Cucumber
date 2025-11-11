import { Page } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async sortProducts(sortOption: string) {
    await this.page.selectOption('.product_sort_container', { label: sortOption });
  }

  public async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page.$$('.inventory_item_price');
    const prices = [];

    for (const element of priceElements) {
      const priceText = await element.textContent();
      prices.push(parseFloat(priceText!.replace('$', '')));
    }

    return prices;
  }
}
