import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '.product_sort_container'
    private readonly inventoryItems: string = '.inventory_item'
    private readonly itemPrices: string = '.inventory_item_price'
    private readonly cartBadge: string = '.shopping_cart_badge'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    public async validateProductCount(expectedCount: number) {
        await expect(this.page.locator(this.inventoryItems)).toHaveCount(expectedCount);
    }

    public async sortByPrice(sort: string) {
        const value = sort === 'low to high' ? 'lohi' : 'hilo';
        await this.page.locator(this.sortDropdown).selectOption(value);
    }

    public async validatePriceSortOrder(sort: string) {
        const priceElements = await this.page.locator(this.itemPrices).all();
        const prices: number[] = [];

        for (const el of priceElements) {
            const text = await el.textContent();
            prices.push(parseFloat(text!.replace('$', '')));
        }

        // Compare each price to the next one to verify the order is correct.
        for (let i = 0; i < prices.length - 1; i++) {
            if (sort === 'low to high') {
                expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
            } else {
                expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
            }
        }
    }

    // Checks the cart icon shows the right item count.
    public async validateCartCount(expectedCount: string) {
        await expect(this.page.locator(this.cartBadge)).toHaveText(expectedCount);
    }
}
