import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select[data-test="product-sort-container"]'
    private readonly itemPrice: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    // Clicks the "Add to cart" button for the Sauce Labs Backpack item
    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    // Selects an option from the sort dropdown (e.g. "Price (low to high)")
    public async sortBy(sortLabel: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: sortLabel })
    }

    // Reads every product price on the page and returns them as numbers (e.g. [9.99, 15.99])
    public async getPrices(): Promise<number[]> {
        const priceTexts = await this.page.locator(this.itemPrice).allTextContents()
        return priceTexts.map(text => parseFloat(text.replace('$', '')))
    }

    // Checks that the product prices are in the expected order ('asc' or 'desc'), throws if not
    public async validateSortedByPrice(order: string) {
        const prices = await this.getPrices()

        for (let i = 1; i < prices.length; i++) {
            const previousPrice = prices[i - 1]
            const currentPrice = prices[i]

            if (order === 'asc' && currentPrice < previousPrice) {
                throw new Error(`Expected prices to be sorted low to high: [${prices.join(', ')}]`)
            }

            if (order === 'desc' && currentPrice > previousPrice) {
                throw new Error(`Expected prices to be sorted high to low: [${prices.join(', ')}]`)
            }
        }
    }
}