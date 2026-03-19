import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartLink: string = '[data-test="shopping-cart-link"]'
    private readonly sortDropdownContainer: string = '[data-test="product-sort-container"]'
    private readonly itemPrice: string = '[data-test="inventory-item-price"]'


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async selectCart(){
        await this.page.locator(this.cartLink).click()
    }

    public async sortByPrice(sort: string) {
    const value = sort === 'low to high' ? 'lohi' : 'hilo'
    await this.page.locator(this.sortDropdownContainer).selectOption(value)
    }

    public async validatePriceSorting(sort: string) {
    const itemsPrices = await this.page.locator(this.itemPrice).allInnerTexts()
    const prices = itemsPrices.map(p => parseFloat(p.replace('$', '')))
    const sorted = [...prices].sort((a, b) => sort === 'low to high' ? a - b : b - a)
    expect(prices).toEqual(sorted)
    }
    
    
}