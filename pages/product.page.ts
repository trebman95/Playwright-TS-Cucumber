import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartButton: string = '.shopping_cart_link'
    private readonly sortSelect: string = 'select.product_sort_container'
    private readonly itemPrices: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortByPrice(option: string) {
        const value = option === 'Price (low to high)' ? 'lohi' : 'hilo'
        const sortLocator = this.page.locator(this.sortSelect)
        await sortLocator.waitFor({ state: 'visible', timeout: 10000 })

        const selected = await sortLocator.selectOption(value)
        if (!selected || selected.length === 0) {
            throw new Error(`Cannot set sort option '${option}' (value: '${value}')`)
        }

        await this.page.waitForTimeout(500)
    }

    public async getPrices(): Promise<number[]> {
        const priceElements = this.page.locator(this.itemPrices)
        const count = await priceElements.count()
        const prices: number[] = []

        for (let i = 0; i < count; i++) {
            const text = (await priceElements.nth(i).textContent())?.trim() || ''
            const price = Number(text.replace('$', ''))
            prices.push(price)
        }

        return prices
    }

    public async addBackPackAndGoToCart() {
        await this.addBackPackToCart()
        await this.page.locator(this.cartButton).click()
    }

    public async goToCart() {
        await this.page.locator(this.cartButton).click()
    }
}