import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-test="product-sort-container"]'
    private readonly itemPrice: string = '.inventory_item_price'
    private readonly expectedItemCount: number = 6

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortItemsBy(sortLabel: string) {
        await this.page.locator(this.sortDropdown).selectOption(sortLabel, {timeout: 30000});
    }

    public async validatePricesSorted(direction: 'asc' | 'desc') {
        const priceTexts = await this.page.locator(this.itemPrice).allTextContents()

        if (priceTexts.length !== this.expectedItemCount) {
            throw new Error(`Expected ${this.expectedItemCount} items but found ${priceTexts.length}`)
        }

        const prices = priceTexts.map((text) => {
            const parsed = parseFloat(text.replace('$', ''))
            if (Number.isNaN(parsed)) {
                throw new Error(`Could not parse price from "${text}"`)
            }
            return parsed
        })

        const expected = [...prices].sort((a, b) => direction === 'asc' ? a - b : b - a)

        for (let i = 0; i < prices.length; i++) {
            if (prices[i] !== expected[i]) {
                throw new Error(`Prices are not sorted ${direction}.`)
            }
        }
    }
}
