import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select[data-test="product-sort-container"]'
    private readonly productPrices: string = '.inventory_item_price'
    private readonly priceSortOptions: Record<string, string> = {
        'Price (low to high)': 'lohi',
        'Price (high to low)': 'hilo',
    }

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortItemsBy(sortOption: string) {
        const optionValue = this.priceSortOptions[sortOption]

        if (!optionValue) {
            throw new Error(`Unsupported sort option: ${sortOption}`)
        }

        await this.page.locator(this.sortDropdown).selectOption(optionValue)
    }

    public async validateProductsSortedByPrice(sortOption: string) {
        const prices = await this.getProductPrices()
        const sortedPrices = [...prices].sort((firstPrice, secondPrice) => {
            return sortOption === 'Price (high to low)'
                ? secondPrice - firstPrice
                : firstPrice - secondPrice
        })

        expect(prices).toHaveLength(6)
        expect(prices).toEqual(sortedPrices)
    }

    private async getProductPrices() {
        const priceTexts = await this.page.locator(this.productPrices).allTextContents()

        return priceTexts.map((priceText) => Number(priceText.replace('$', '')))
    }
}
