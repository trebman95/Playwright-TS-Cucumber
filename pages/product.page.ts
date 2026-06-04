import { expect, Page } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly sortDropdown: string =
    '[data-test="product-sort-container"]';
  private readonly itemContainer: string = '[data-test="inventory-list"] > div';
  private readonly itemPrice: string = `[data-test="inventory-item-price"]`;
  private readonly itemName: string = `[data-test^="item-"][data-test$="-title-link"]`;

  constructor(page: Page) {
    this.page = page;
  }

  public async selectSortOption(sort: string) {
    await this.page.locator(this.sortDropdown).selectOption({ label: sort });
  }

  public async assertPricesSorted(sort: string) {
    // Get all prices
    const prices: number[] = [];
    for (
      let i = 0;
      i <
      (await this.page
        .locator(`${this.itemContainer} ${this.itemPrice}`)
        .count());
      i++
    ) {
      const priceFormatted = parseFloat(
        (
          await this.page
            .locator(`${this.itemContainer} ${this.itemPrice}`)
            .nth(i)
            .innerText()
        ).replace("$", ""),
      );
      prices.push(priceFormatted);
    }
    console.log(`prices:`, prices);
    const pricesSorted = [...prices].sort((a, b) =>
      sort === "Price (low to high)" ? a - b : b - a,
    );
    expect(prices).toEqual(pricesSorted);
  }

  public async assertNamesSorted(sort: string) {
    // Get all prices
    const names: string[] = [];
    for (
      let i = 0;
      i <
      (await this.page
        .locator(`${this.itemContainer} ${this.itemName}`)
        .count());
      i++
    ) {
      const name = await this.page
        .locator(`${this.itemContainer} ${this.itemName}`)
        .nth(i)
        .innerText();
      names.push(name);
    }
    console.log(`names:`, names);
    const namesSorted = [...names].sort((a, b) =>
      sort === "Name (A to Z)" ? a.localeCompare(b) : b.localeCompare(a),
    );
    expect(names).toEqual(namesSorted);
  }
}
