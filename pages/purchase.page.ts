import { expect,Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartLink: string = 'a.shopping_cart_link'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly successMessage: string = 'h2[data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }


    public async selectCart() {
        await this.page.locator(this.cartLink).click()
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click()
    }

    public async fillCheckoutInformation() {
        await this.page.locator(this.firstNameField).fill('Virat')
        await this.page.locator(this.lastNameField).fill('Kohli')
        await this.page.locator(this.postalCodeField).fill('12345')
    }

    public async selectContinue() {
        await this.page.locator(this.continueButton).click()
    }

    public async selectFinish() {
        await this.page.locator(this.finishButton).click()
    }

    public async validateSuccessMessage(expectedMessage: string) {
        const actualMessage = await this.page.locator(this.successMessage).textContent()
        await this.page.locator(this.successMessage).isVisible()
        await expect(expectedMessage).toEqual(actualMessage)
    }
}