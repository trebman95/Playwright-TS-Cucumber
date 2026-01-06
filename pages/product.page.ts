import { expect, Page } from "@playwright/test"
export class Product {
    private readonly page: Page
    private readonly cartButton = '.shopping_cart_link';
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartBadge = '.shopping_cart_badge';
    private readonly sortDropdownSelector = '.product_sort_container';
    private readonly priceLocator = '.inventory_item_price';
    constructor(page: Page) {
        this.page = page;
    }
    public async clickCart() {
        await this.page.locator(this.cartButton).click();
    }
    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    public async validateCartCount(expectedCount: number) {
        const badge = this.page.locator(this.cartBadge);
        if (expectedCount === 0) {
            await expect(badge).toHaveCount(0);
        } else {
            await expect(badge).toHaveText(String(expectedCount));
        }
    }

   public async sortItems(sortOption: string) {
    await this.page.waitForSelector(this.sortDropdownSelector, { state: 'visible' });
        await this.page.selectOption(this.sortDropdownSelector, { label: sortOption });
}
    public async validatePriceSorting(totalItems: number, sortOrder: string) {
        const prices = await this.page.locator(this.priceLocator).allTextContents();
        expect(prices.length).toBe(totalItems);

        const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

        const sortedPrices = [...numericPrices].sort((a, b) =>
            sortOrder.includes('low to high') ? a - b : b - a
        );
        expect(numericPrices).toEqual(sortedPrices);
    }
}