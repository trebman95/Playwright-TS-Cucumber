import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartIcon: string = '.shopping_cart_link'
    private readonly checkoutButton: string = '[data-test="checkout"]'
    private readonly firstNameField: string = '[data-test="firstName"]'
    private readonly lastNameField: string = '[data-test="lastName"]'
    private readonly zipField: string = '[data-test="postalCode"]'
    private readonly continueButton: string = '[data-test="continue"]'
    private readonly finishButton: string = '[data-test="finish"]'
    private readonly confirmationMessage: string = '[data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    // Clicks the cart icon in the top-right to open the cart
    public async goToCart() {
        await this.page.locator(this.cartIcon).click()
    }

    // Clicks the Checkout button inside the cart
    public async clickCheckout() {
        await this.page.locator(this.checkoutButton).click()
    }

    // Fills in the customer information form fields
    public async fillInDetails(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.firstNameField).fill(firstName)
        await this.page.locator(this.lastNameField).fill(lastName)
        await this.page.locator(this.zipField).fill(zip)
    }

    // Clicks Continue to proceed to the order summary
    public async clickContinue() {
        await this.page.locator(this.continueButton).click()
    }

    // Clicks Finish to complete the purchase
    public async clickFinish() {
        await this.page.locator(this.finishButton).click()
    }

    // Reads the confirmation message and checks it matches the expected text
    public async validateConfirmationMessage(expectedMessage: string) {
        const actualMessage = await this.page.locator(this.confirmationMessage).innerText()
        if (actualMessage !== expectedMessage) {
            throw new Error(`Expected "${expectedMessage}" but found "${actualMessage}"`)
        }
    }
}
