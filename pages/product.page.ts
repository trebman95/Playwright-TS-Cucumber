import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '.product_sort_container'
    private readonly pricesOfProducts: string = '.inventory_item_price'


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortProducts(sort: string) {
        await this.page.selectOption(this.sortDropdown, { label: sort })
    }

    public async getPricesofProducts() {
        const prices = await this.page.locator(this.pricesOfProducts).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }
}