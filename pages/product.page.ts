import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown = '.product_sort_container'
    private readonly prices = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
    async sortBy(option: string) {
        await this.page.selectOption(this.sortDropdown, { label: option })
    }

    async validateSorted(order: string) {
        const priceTexts = await this.page.locator(this.prices).allTextContents()
    
        const prices = priceTexts.map(p => parseFloat(p.replace('$', '')))
    
        const sorted = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a)
    
        if (JSON.stringify(prices) !== JSON.stringify(sorted)) {
            throw new Error(Products are not sorted correctly: ${order})
        }
    }
}