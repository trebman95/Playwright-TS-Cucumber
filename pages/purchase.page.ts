import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartIcon: string = '[data-test="shopping-cart-link"]'
    private readonly checkoutButton: string = '[data-test="checkout"]'
    private readonly firstNameField: string = '[data-test="firstName"]'
    private readonly lastNameField: string = '[data-test="lastName"]'
    private readonly zipCodeField: string = '[data-test="postalCode"]'
    private readonly continueButton: string = '[data-test="continue"]'
    private readonly finishButton: string = '[data-test="finish"]'
    private readonly confirmationText: string = '[data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async selectCart() {
        await this.page.locator(this.cartIcon).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillCheckoutInfo(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.zipCodeField).fill(zip);
    }

    public async selectContinue() {
        await this.page.locator(this.continueButton).click();
    }

    public async selectFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateConfirmationText(expectedText: string) {
        const text = await this.page.locator(this.confirmationText).textContent();
        if (text?.trim() !== expectedText) {
            throw new Error(`Expected confirmation text to be "${expectedText}" but found "${text?.trim()}"`);
        }
    }
}
