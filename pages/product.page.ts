import { Page } from "@playwright/test"

export class Product {
  private readonly page: Page;
  private readonly addToCart: string =
    'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortDropdown: string = "select.product_sort_container";
  private readonly itemPrice: string = ".inventory_item_price";

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async sortBy(sortOption: string) {
    let value = "";
    if (sortOption === "Price (high to low)") {
      value = "hilo";
    } else if (sortOption === "Price (low to high)") {
      value = "lohi";
    } else if (sortOption === "Name (A to Z)") {
      value = "az";
    } else if (sortOption === "Name (Z to A)") {
      value = "za";
    }
    await this.page.locator(this.sortDropdown).selectOption(value);
  }

  public async validatePriceSort() {
    const selectedValue = await this.page
      .locator(this.sortDropdown)
      .inputValue();

    const prices = await this.page.locator(this.itemPrice).allTextContents();
    const floatPrices = prices.map((price) =>
      parseFloat(price.replace("$", "")),
    );

    if (floatPrices.length !== 6) {
      throw new Error(`Expected 6 items but found ${floatPrices.length}`);
    }

    const sortedPrices = [...floatPrices];
    if (selectedValue === "hilo") {
      sortedPrices.sort((a, b) => b - a);
    } else if (selectedValue === "lohi") {
      sortedPrices.sort((a, b) => a - b);
    }

    for (let i = 0; i < floatPrices.length; i++) {
      if (floatPrices[i] !== sortedPrices[i]) {
        throw new Error(
          `Items are not sorted correctly. Expected ${sortedPrices[i]} but got ${floatPrices[i]}`,
        );
      }
    }
  }
}