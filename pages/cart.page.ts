import { Page } from "@playwright/test"

export class Cart {
    private readonly page: Page
    private readonly checkoutButton: string = '#checkout'

    constructor(page: Page) {
        this.page = page;
    }

    public async clickCheckout() {
        await this.page.locator(this.checkoutButton).click()
    }
}
