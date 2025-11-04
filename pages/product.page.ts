import { Page } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly addToCart: string =
    'button[id="add-to-cart-sauce-labs-backpack"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }
}

export function getSortOptionValue(sortOption: string): string {
  const sortMap: Record<string, string> = {
    "price (low to high)": "lohi",
    "price (high to low)": "hilo",
    "name (a to z)": "az",
    "name (z to a)": "za",
  };

  const key = sortOption.toLowerCase();
  const value = sortMap[key];
  if (!value) throw new Error(`Invalid sort option: ${sortOption}`);
  return value;
}

export async function getProductNames(page: Page): Promise<string[]> {
  return page.$$eval('[data-test="inventory-item-name"]', (els) =>
    els.map((el) => (el.textContent ?? "").trim())
  );
}

export async function getProductPrices(page: Page): Promise<number[]> {
  return page.$$eval('[data-test="inventory-item-price"]', (els) =>
    els.map((el) => parseFloat((el.textContent ?? "").replace("$", "")))
  );
}
export function sortNames(names: string[], order: "asc" | "desc"): string[] {
  return [...names].sort((a, b) =>
    order === "asc" ? a.localeCompare(b) : b.localeCompare(a)
  );
}

export function sortPrices(prices: number[], order: "asc" | "desc"): number[] {
  return [...prices].sort((a, b) => (order === "asc" ? a - b : b - a));
}
