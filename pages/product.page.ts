import { Page } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly sortDropdown = "[data-test='product-sort-container']";
  private readonly inventoryItemPrice = "[data-test='inventory-item-price']";
  constructor(page: Page) {
    this.page = page;
  }

  public async sortProducts(optionLabel: string) {
    await this.page
      .locator(this.sortDropdown)
      .selectOption({ label: optionLabel });
  }

  public async getAllPrices(): Promise<number[]> {
    const textPrices = await this.page
      .locator(this.inventoryItemPrice)
      .allTextContents();
    return textPrices.map((price) => Number(price.replace("$", "").trim()));
  }

  public async validateLowToHigh(): Promise<boolean> {
    const prices = await this.getAllPrices();
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < prices[i - 1]) return false;
    }
    return true;
  }

  public async validateHighToLow(): Promise<boolean> {
    const prices = await this.getAllPrices();
    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) return false;
    }
    return true;
  }
}
