import { Page } from "@playwright/test"

export class Checkout {
    private readonly page: Page
    private readonly cartIcon: string = 'a.shopping_cart_link'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly confirmationHeader: string = 'h2.complete-header'

    constructor(page: Page) {
        this.page = page;
    }

    public async goToCart() {
        await this.page.locator(this.cartIcon).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillInDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.postalCodeField).fill(postalCode);
    }

    public async selectContinue() {
        await this.page.locator(this.continueButton).click();
    }

    public async selectFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateConfirmationText(expectedText: string) {
        const confirmationText = await this.page.locator(this.confirmationHeader).innerText();
        if (confirmationText !== expectedText) {
            throw new Error(`Expected confirmation text to be "${expectedText}" but found "${confirmationText}"`);
        }
    }
}
