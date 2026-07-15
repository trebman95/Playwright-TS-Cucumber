import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-testid="product-sort-container"]'
    private readonly productPrices: string = '[data-testid="inventory-item-price"]'
    private readonly productNames: string = '[data-testid="inventory-item-name"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortProductsBy(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption(sortOption.toLowerCase().replace(/\s+/g, '_'))
        // Wait for products to be resorted
        await this.page.waitForTimeout(500)
    }

    public async getProductPrices(): Promise<number[]> {
        const priceElements = await this.page.locator(this.productPrices).allTextContents()
        return priceElements.map(price => parseFloat(price.replace('$', '')))
    }

    public async getProductNames(): Promise<string[]> {
        return await this.page.locator(this.productNames).allTextContents()
    }

    public async validateProductsSortedByPrice(sortOrder: 'asc' | 'desc') {
        const prices = await this.getProductPrices()
        const sortedPrices = [...prices].sort((a, b) => sortOrder === 'asc' ? a - b : b - a)
        
        for (let i = 0; i < prices.length; i++) {
            if (prices[i] !== sortedPrices[i]) {
                throw new Error(
                    `Products not sorted correctly by price (${sortOrder}). ` +
                    `Expected: [${sortedPrices}] but got: [${prices}]`
                )
            }
        }
    }

    public async validateProductsSortedByName(sortOrder: 'asc' | 'desc') {
        const names = await this.getProductNames()
        const sortedNames = [...names].sort((a, b) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a))
        
        for (let i = 0; i < names.length; i++) {
            if (names[i] !== sortedNames[i]) {
                throw new Error(
                    `Products not sorted correctly by name (${sortOrder}). ` +
                    `Expected: [${sortedNames}] but got: [${names}]`
                )
            }
        }
    }

    public async validateProductCountIs(expectedCount: number) {
        const actualCount = await this.page.locator(this.productNames).count()
        if (actualCount !== expectedCount) {
            throw new Error(
                `Expected ${expectedCount} products but found ${actualCount}`
            )
        }
    }
}