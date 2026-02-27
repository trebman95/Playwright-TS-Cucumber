import { Page, expect } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly addToCart: string =
    'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortDropdown: string =
    '[data-test="product-sort-container"]';
  private readonly itemPrices: string = ".inventory_item_price";
  private readonly itemNames: string = ".inventory_item_name";
  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async sortItemsBy(option: string) {
    await this.page.locator(this.sortDropdown).selectOption({ label: option });
  }

  public async validateItemsSorted(sortOption: string) {
    // Определяем тип сортировки из строки
    const isByPrice = sortOption.toLowerCase().includes("price");
    const isAscending =
      sortOption.includes("low to high") || sortOption.includes("A to Z");

    if (isByPrice) {
      // Проверка цен
      const pricesLocator = this.page.locator(this.itemPrices);
      const prices = (await pricesLocator.allTextContents()).map((p) =>
        parseFloat(p.replace("$", ""))
      );

      const expected = [...prices].sort((a, b) =>
        isAscending ? a - b : b - a
      );

      expect(prices).toEqual(expected);
    } else {
      // Проверка имен
      const namesLocator = this.page.locator(this.itemNames);
      const names = await namesLocator.allTextContents();

      const expected = [...names].sort((a, b) =>
        isAscending ? a.localeCompare(b) : b.localeCompare(a)
      );

      expect(names).toEqual(expected);
    }
  }
}