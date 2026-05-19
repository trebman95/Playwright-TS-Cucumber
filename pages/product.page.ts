import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown : string ='.product_sort_container'
    private readonly productPrices : string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
    public async sortProducts(sortOption: string){
        await this.page.selectOption(this.sortDropdown,
             {label: sortOption})
    }
    public async getAllProductPrices(){
        const prices = await this.page
             .locator(this.productPrices)
             .allTextContents();
         return prices.map(price =>
             parseFloat(price.replace('$',''))
    )}
}