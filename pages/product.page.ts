import { Page, expect } from "@playwright/test";

export class Product {
  constructor(private readonly page: Page) {}
  private readonly addToCart = 'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortSelect = 'select.product_sort_container';
  private readonly itemNames = '.inventory_item_name';
  private readonly itemPrices = '.inventory_item_price';

  private mapLabelToValue(label: string): 'az' | 'za' | 'lohi' | 'hilo' {
    const m: Record<string, 'az' | 'za' | 'lohi' | 'hilo'> = {
      'Name (A to Z)': 'az',
      'Name (Z to A)': 'za',
      'Price (low to high)': 'lohi',
      'Price (high to low)': 'hilo',
    };
    const v = m[label];
    if (!v) throw new Error(`Unknown sort label: ${label}`);
    return v;
  }

  async waitForInventoryReady(expectedCount = 6) {
    await this.page.waitForURL('**/inventory.html', { waitUntil: 'domcontentloaded' });
    await expect(this.page.locator(this.itemNames)).toHaveCount(expectedCount);
    const select = this.page.locator(this.sortSelect);
    await expect(select).toBeVisible();
    await expect(select).toBeEnabled();
  }

  async sortBy(label: string) {
    await this.waitForInventoryReady(6);
    const select = this.page.locator(this.sortSelect);
    const value = this.mapLabelToValue(label);
    await select.scrollIntoViewIfNeeded();
    await select.click({ trial: true }).catch(() => {});
    await select.selectOption({ value });
    await expect(select).toHaveValue(value, { timeout: 3000 }).catch(async () => {
      await select.evaluate((el, v) => {
        (el as HTMLSelectElement).value = v as string;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);
      await expect(select).toHaveValue(value);
    });
    await this.page.waitForTimeout(150);
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  private async prices(): Promise<number[]> {
    const raw = await this.page.locator(this.itemPrices).allTextContents();
    return raw.map(p => Number(p.replace('$', '').trim()));
  }

  async expectPricesSortedLowHigh() {
    const arr = await this.prices();
    const sorted = [...arr].sort((a, b) => a - b);
    expect(arr).toEqual(sorted);
  }

  async expectPricesSortedHighLow() {
    const arr = await this.prices();
    const sorted = [...arr].sort((a, b) => b - a);
    expect(arr).toEqual(sorted);
  }
}
