import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartButton: string = 'a[class="shopping_cart_link"]'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameInput: string = 'input[id="first-name"]'
    private readonly lastNameInput: string = 'input[id="last-name"]'
    private readonly zipCodeInput: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly orderConfirmationText: string = 'h2[class="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async selectCart() {
        await this.page.locator(this.cartButton).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.zipCodeInput).fill(zipCode);
    }

    public async selectContinue() {
        await this.page.locator(this.continueButton).click();
    }

    public async selectFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async getOrderConfirmationText(): Promise<string> {
        return await this.page.locator(this.orderConfirmationText).textContent() || '';
    }
}
