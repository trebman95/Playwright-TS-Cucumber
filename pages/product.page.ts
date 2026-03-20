import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select[data-test="product-sort-container"]'
    private readonly itemPrices: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortBy(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: sortOption });
    }

    public async validateSortedByPrice(sortOption: string) {
        const priceElements = await this.page.locator(this.itemPrices).allInnerTexts();
        const prices = priceElements.map(p => parseFloat(p.replace('$', '')));

        const isAscending = sortOption === 'Price (low to high)';
        const sorted = [...prices].sort((a, b) => isAscending ? a - b : b - a);

        if (JSON.stringify(prices) !== JSON.stringify(sorted)) {
            throw new Error(`Expected prices to be sorted by "${sortOption}" but found: ${prices.join(', ')}`);
        }
    }
}