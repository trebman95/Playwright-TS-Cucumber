import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartIcon: string = 'a.shopping_cart_link'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly zipCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly confirmationText: string = '.complete-header'

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
