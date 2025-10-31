import { Page } from "@playwright/test"

export class Purchase {
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'

    constructor(private readonly page: Page) {
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
    public async openCart() {
        await this.page.locator('a[class="shopping_cart_link"]').click()
    }
    public async clickCheckout() {
        await this.page.locator('button[id="checkout"]').click()
    }
    public async fillDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('input[id="first-name"]').fill(firstName)
        await this.page.locator('input[id="last-name"]').fill(lastName)
        await this.page.locator('input[id="postal-code"]').fill(postalCode)
    }
    public async clickContinue() {
        await this.page.locator('input[id="continue"]').click()
    }
    public async clickFinish() {
        await this.page.locator('button[id="finish"]').click()
    }
    public async verifyThankYouMessage(message: string) {
        await this.page.locator('h2[class="complete-header"]').textContent().then( text => {
            if (text !== message) {
                throw new Error(`Expected message to be ${message} but found ${text}`)
            }
        })
    }           
}
