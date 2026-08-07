import { Page } from "@playwright/test";

export class Product {
    private readonly page: Page;
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]';
    private readonly sortSelect: string = 'select[data-test="product-sort-container"]';
    private readonly priceLabels: string = '.inventory_item_price';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    /**
     * Sort items using the dropdown on the inventory page.
     * @param option The visible label of the option, e.g. "Price (low to high)".
     */
    public async sortBy(option: string) {
        // Ensure we are on the inventory page before interacting.
        await this.page.waitForURL('**/inventory.html', { timeout: 15000 });
        // Wait for the inventory items to be loaded.
        await this.page.waitForSelector('.inventory_item', { timeout: 15000 });
        // Ensure the sort dropdown is visible.
        await this.page.waitForSelector(this.sortSelect, { state: 'visible', timeout: 15000 });
        await this.page.locator(this.sortSelect).selectOption({ label: option });
    }

    /**
     * Validate that the list of prices is sorted according to the requested order.
     * @param order "low" for ascending (low to high) or "high" for descending (high to low).
     */
    public async validateSorted(order: 'low' | 'high') {
        const priceTexts = await this.page.locator(this.priceLabels).allTextContents();
        const prices = priceTexts.map(t => parseFloat(t.replace('$', '').trim()));
        const sorted = [...prices].sort((a, b) => (order === 'low' ? a - b : b - a));
        if (JSON.stringify(prices) !== JSON.stringify(sorted)) {
            throw new Error(`Prices are not sorted correctly for order '${order}'. Expected ${sorted}, got ${prices}`);
        }
    }
}
