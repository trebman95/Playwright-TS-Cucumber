import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartLink: string = '[data-test="shopping-cart-link"]'
    private readonly checkoutButton: string = '[data-test="checkout"]'
    private readonly firstNameField: string = '[data-test="firstName"]'
    private readonly lastNameField: string = '[data-test="lastName"]'
    private readonly postalCodeField: string = '[data-test="postalCode"]'
    private readonly continueButton: string = '[data-test="continue"]'
    private readonly finishButton: string = '[data-test="finish"]'
    private readonly completeHeader: string = '[data-test="complete-header"]'
    private readonly errorMessage: string = '[data-test="error"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async goToCart() {
        await this.page.locator(this.cartLink).click()
    }

    public async checkout() {
        await this.page.locator(this.checkoutButton).click()
    }

    public async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName)
        await this.page.locator(this.lastNameField).fill(lastName)
        await this.page.locator(this.postalCodeField).fill(postalCode)
    }

    public async continueCheckout() {
        await this.page.locator(this.continueButton).click()
    }

    public async finish() {
        await this.page.locator(this.finishButton).click()
    }

    public async validateCompleteHeader(expectedText: string) {
        const actual = await this.page.locator(this.completeHeader).textContent()
        if (actual !== expectedText) {
            throw new Error(`Expected text to be ${expectedText} but found ${actual}`)
        }
    }

    public async validateCheckoutError(expectedError: string) {
        const actual = await this.page.locator(this.errorMessage).textContent()
        if (actual !== expectedError) {
            throw new Error(`Expected checkout error to be ${expectedError} but found ${actual}`)
        }
    }
}