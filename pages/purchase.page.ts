import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page

    private readonly cartIcon = '.shopping_cart_link'
    private readonly checkoutBtn = '#checkout'
    private readonly firstName = '#first-name'
    private readonly lastName = '#last-name'
    private readonly zip = '#postal-code'
    private readonly continueBtn = '#continue'
    private readonly finishBtn = '#finish'
    private readonly successMsg = '.complete-header'

    constructor(page: Page) {
        this.page = page;
    }

    async openCart() {
        await this.page.locator(this.cartIcon).click()
    }

    async checkout() {
        await this.page.locator(this.checkoutBtn).click()
    }

    async enterDetails(fn: string, ln: string, zip: string) {
        await this.page.fill(this.firstName, fn)
        await this.page.fill(this.lastName, ln)
        await this.page.fill(this.zip, zip)
    }

    async continue() {
        await this.page.locator(this.continueBtn).click()
    }

    async finish() {
        await this.page.locator(this.finishBtn).click()
    }

    async validateSuccessMessage(expected: string) {
        const actual = await this.page.locator(this.successMsg).innerText()
        if (actual !== expected) {
            throw new Error(`Expected: ${expected}, Got: ${actual}`)
        }
    }
}