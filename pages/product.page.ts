import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sort: string = '[data-test="product-sort-container"]'
    private readonly inventoryItemPrice: string = '[class="inventory_item_price"]'
    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    public async sortBy(sortOption: string) {
        await this.page.locator(this.sort).selectOption(sortOption);
    }

    public async isSortedLoHi() {
        const prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
       
        const numericPrices = prices.map(p =>
            parseFloat(p.replace('$', '').trim())
            );

        const sortedPrices = [...numericPrices].sort((a, b) => a - b);

        expect(sortedPrices).toEqual(numericPrices);
    }

    public async isSortedHiLo() {
        const prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
        
        const numericPrices = prices.map(p =>
            parseFloat(p.replace('$', '').trim())
            );

        const sortedPrices = [...numericPrices].sort((a, b) => b - a);

        expect(sortedPrices).toEqual(numericPrices);
    }
}