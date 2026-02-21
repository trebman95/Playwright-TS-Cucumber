import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select.product_sort_container'
    private readonly itemPrices: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortItemsBy(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: sortOption });
    }

    public async validateItemsSortedByPrice(order: string) {
        const priceElements = await this.page.locator(this.itemPrices).allTextContents();
        if (priceElements.length !== 6) {
            throw new Error(`Expected 6 items but found ${priceElements.length}`);
        }
        const prices = priceElements.map(p => parseFloat(p.replace('$', '')));
        for (let i = 0; i < prices.length - 1; i++) {
            if (order === 'asc' && prices[i] > prices[i + 1]) {
                throw new Error(`Items are not sorted by price (low to high). Found ${prices[i]} before ${prices[i + 1]}`);
            }
            if (order === 'desc' && prices[i] < prices[i + 1]) {
                throw new Error(`Items are not sorted by price (high to low). Found ${prices[i]} before ${prices[i + 1]}`);
            }
        }
    }
}