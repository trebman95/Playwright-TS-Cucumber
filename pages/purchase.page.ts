import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly goToCart: string = 'a.shopping_cart_link'
    private readonly checkoutButton: string = 'button[data-test="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly zipField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[data-test="continue"]'
    private readonly finishButton: string = 'button[data-test="finish"]'
    private readonly confirmationMessage: string = 'h2.complete-header'

    constructor(page: Page) {
        this.page = page;
    }

    public async goToCartPage() {
        const cartLink = this.page.locator(this.goToCart)
        await cartLink.waitFor({ state: 'visible' })
        await cartLink.click()
    }

    public async clickCheckout() {
        const checkout = this.page.locator(this.checkoutButton)
        await checkout.waitFor({ state: 'visible' })
        await checkout.click()
    }

    public async fillCheckoutForm(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.firstNameField).fill(firstName)
        await this.page.locator(this.lastNameField).fill(lastName)
        await this.page.locator(this.zipField).fill(zip)
    }

    public async clickContinue() {
        const continueButton = this.page.locator(this.continueButton)
        await continueButton.waitFor({ state: 'visible' })
        await continueButton.click()
    }

    public async clickFinish() {
        const finishButton = this.page.locator(this.finishButton)
        await finishButton.waitFor({ state: 'visible' })
        await finishButton.click()
    }

    public async validateConfirmationMessage(expectedMessage: string) {
        const confirmation = this.page.locator(this.confirmationMessage)
        await confirmation.waitFor({ state: 'visible' })
        const actualMessage = (await confirmation.textContent())?.trim()

        if (actualMessage !== expectedMessage) {
            throw new Error(`Expected text to be ${expectedMessage} but found ${actualMessage}`)
        }
    }
}