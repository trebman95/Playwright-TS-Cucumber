import { Page } from "@playwright/test";

export class Product {
  private readonly page: Page;

  private readonly addToCart =
    'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortDropdown =
    'select.product_sort_container';
  private readonly prices =
    '.inventory_item_price';
  private readonly cartBadge =
    '.shopping_cart_badge';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async sortProducts(option: string) {
  const dropdown = this.page.locator(this.sortDropdown);
  await dropdown.waitFor({ state: 'visible' });
  await dropdown.selectOption({ label: option });
}

  private async getAllPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator(this.prices)
      .allInnerTexts();

    return priceTexts.map(p => Number(p.replace('$', '').trim()));
  }

  public async validatePriceSorting(order: string) {
    const prices = await this.getAllPrices();
    const sorted = [...prices].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );

    if (JSON.stringify(prices) !== JSON.stringify(sorted)) {
      throw new Error(
        `Prices are not sorted in ${order} order. Actual: ${prices}`
      );
    }
  }

  // EXTRA COVERAGE 

  public async validateCartCount(expected: string) {
    const count = await this.page.locator(this.cartBadge).innerText();

    if (count !== expected) {
      throw new Error(
        `Expected cart count ${expected} but found ${count}`
      );
    }
  }
}