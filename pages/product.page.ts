import { Page, Locator } from "@playwright/test";

export class Product {
    private readonly sortSelect: Locator;
    private readonly items: Locator;
    private readonly prices: Locator;

    constructor(private page: Page) {
        this.sortSelect = page.locator('[data-test="product-sort-container"]');
        this.items = page.locator('.inventory_item');
        this.prices = page.locator('.inventory_item_price, [data-test="inventory-item-price"]');
    }

async sortItemsBy(option: string) {
  const valueMap: Record<string, string> = {
    'Price (low to high)': 'lohi',
    'Price (high to low)': 'hilo',
  };

  const value =
    valueMap[option] ??
    (await this.sortSelect.locator(`option:has-text("${option}")`).first().getAttribute('value'));

  if (!value) throw new Error(`No value found for option: ${option}`);

  // Select the option
  await this.sortSelect.selectOption(value);

  // ✅ Verify that it actually changed
  const selected = await this.sortSelect.inputValue();
  if (selected !== value) {
    throw new Error(
      `Sort not applied correctly. Expected value "${value}", but dropdown shows "${selected}".`
    );
  }
}

    async countItems(): Promise<number> {
        return this.items.count();
    }

    async validateItemsSortedByPrice(direction: 'ascending' | 'descending') {
        const texts = await this.prices.allTextContents();
        const nums = texts.map(t => {
            const n = Number(t.replace(/[^0-9.]/g, ''));
            if (Number.isNaN(n)) throw new Error(`Unable to parse price: "${t}"`);
            return n;
        });

        const sorted = [...nums].sort((a, b) => (direction === 'ascending' ? a - b : b - a));

        if (nums.length !== sorted.length || nums.some((n, i) => n !== sorted[i])) {
            throw new Error(`Prices not ${direction}. Got: [${nums.join(', ')}]`);
        }
    }
}

