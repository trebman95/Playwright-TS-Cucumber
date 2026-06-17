import { expect, Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartLink: string = '[data-test="shopping-cart-link"]'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly completeHeader: string = '[data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async openCart() {
        await this.page.locator(this.cartLink).click()
    }

    public async proceedToCheckout() {
        await this.page.locator(this.checkoutButton).click()
    }

    public async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName)
        await this.page.locator(this.lastNameField).fill(lastName)
        await this.page.locator(this.postalCodeField).fill(postalCode)
    }

    public async continueCheckout() {
        await this.page.locator(this.continueButton).click()
    }

    public async finishCheckout() {
        await this.page.locator(this.finishButton).click()
    }

    public async validateSuccessfulPurchaseText(expectedText: string) {
        await expect(this.page.locator(this.completeHeader)).toHaveText(expectedText)
    }
}
