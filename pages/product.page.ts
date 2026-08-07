import { Page } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly addToCart: string =
    'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortBy: string =
    'select[data-test="product-sort-container"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async sortItemsBy(sort: string) {
    let sortValue: string;
    if (sort === "Price (low to high)") {
      sortValue = "lohi";
    } else if (sort === "Price (high to low)") {
      sortValue = "hilo";
    } else {
      throw new Error(`Invalid sort option: ${sort}`);
    }
    await this.page.selectOption(this.sortBy, sortValue);
  }

  public async validateItemsAreSortedByPrice(sort: string) {
    const prices = await this.page.$$eval(
      'div[class="inventory_item_price"]',
      (elements) =>
        elements.map((el) =>
          parseFloat(el.textContent?.replace("$", "") || "0"),
        ),
    );

    let sortedPrices;
    if (sort === "Price (low to high)") {
      sortedPrices = [...prices].sort((a, b) => a - b);
    } else if (sort === "Price (high to low)") {
      sortedPrices = [...prices].sort((a, b) => b - a);
    } else {
      throw new Error(`Invalid sort option: ${sort}`);
    }

    if (JSON.stringify(prices) !== JSON.stringify(sortedPrices)) {
      throw new Error(
        `Expected items to be sorted by price, but got ${JSON.stringify(prices)}`,
      );
    }
  }
}
