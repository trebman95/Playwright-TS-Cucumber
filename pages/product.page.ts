// pages/product.page.ts
import { Page, expect } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortDropdown: string = '//select[@class="product_sort_container"]';
  private readonly itemPricesSelector: string = '.inventory_item_price';
  private readonly inventoryItemSelector: string = '.inventory_item';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  // ✅ Simple, reliable sort: rely on Playwright's auto-wait
  public async sortByPrice(order: string) {
    const dropdown = this.page.locator(this.sortDropdown);
    // Make sure we are actually on the inventory page and dropdown exists
    await expect(dropdown).toBeVisible({ timeout: 10000 });

    const normalized = order.trim().toLowerCase();
    let value: string;

    if (normalized === "low to high" || normalized === "price (low to high)") {
      value = "lohi";
    } else if (normalized === "high to low" || normalized === "price (high to low)") {
      value = "hilo";
    } else {
      throw new Error(`Unsupported sort order: ${order}`);
    }

    await dropdown.selectOption(value);
  }

  public async validateSortedByPrice(order: string) {
    const prices = await this.page.locator(this.itemPricesSelector).allTextContents();

    if (prices.length === 0) {
      throw new Error("No product prices found on the page.");
    }

    const numericPrices = prices.map((p) => {
      const cleaned = p.replace("$", "").trim();
      const value = Number(cleaned);
      if (Number.isNaN(value)) {
        throw new Error(`Unable to parse price value from "${p}"`);
      }
      return value;
    });

    const normalized = order.trim().toLowerCase();
    const isLowToHigh =
      normalized === "low to high" || normalized === "price (low to high)";

    const sorted = [...numericPrices].sort((a, b) =>
      isLowToHigh ? a - b : b - a
    );

    expect(numericPrices).toEqual(sorted);
  }

  public async getProductCount(): Promise<number> {
    return await this.page.locator(this.inventoryItemSelector).count();
  }
}
