import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page

    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartIcon: string = '.shopping_cart_link'
    private readonly checkoutBtn: string = '#checkout'
    private readonly firstName: string = '#first-name'
    private readonly lastName: string = '#last-name'
    private readonly postalCode: string = '#postal-code'
    private readonly continueBtn: string = '#continue'
    private readonly finishBtn: string = '#finish'
    private readonly successMessage: string = '.complete-header'
    private readonly sortDropdown: string = '.product_sort_container'
    private readonly priceList: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async openCart() {
        await this.page.locator(this.cartIcon).click()
    }


    public async clickCheckout() {
        await this.page.locator(this.checkoutBtn).click()
    }

    public async fillCheckoutDetails(fname: string, lname: string, zip: string) {
        await this.page.locator(this.firstName).fill(fname)
        await this.page.locator(this.lastName).fill(lname)
        await this.page.locator(this.postalCode).fill(zip)
    }

    public async clickContinue() {
        await this.page.locator(this.continueBtn).click()
    }

    public async clickFinish() {
        await this.page.locator(this.finishBtn).click()
    }

    public async getSuccessText() {
        return this.page.locator(this.successMessage)
    }

    public async sortBy(option: string) {
        await this.page.selectOption(this.sortDropdown, { label: option })
    }

    public async getAllPrices() {
        return this.page.$$eval(this.priceList, items =>
            items.map(el => parseFloat(el.textContent!.replace('$', '')))
        )
    }
}
