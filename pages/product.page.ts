import { expect, Page } from "@playwright/test";

export class Product {
  private readonly page: Page;

  // data-test attributes are stable selectors intended for automation.
  private readonly addToCart = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly productPrices = '[data-test="inventory-item-price"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async sortProductsBy(sortOption: string) {
    await this.page
      .locator(this.sortDropdown)
      .selectOption({ label: sortOption });
  }

  public async validateProductsSortedByPrice(direction: string) {
    const priceTexts = await this.page
      .locator(this.productPrices)
      .allTextContents();
    // Convert values such as "$29.99" to numbers before comparing their order.
    const actualPrices = priceTexts.map((price) =>
      Number(price.replace("$", "")),
    );

    expect(actualPrices).toHaveLength(6);

    // Copy the array because JavaScript sort() mutates the original array.
    const expectedPrices = [...actualPrices].sort((firstPrice, secondPrice) => {
      if (direction === "ascending") {
        return firstPrice - secondPrice;
      }

      return secondPrice - firstPrice;
    });

    expect(actualPrices).toEqual(expectedPrices);
  }

  public async validateCartBadge(expectedCount: string) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(expectedCount);
  }
}
