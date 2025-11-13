import { Page } from "@playwright/test";

export class Purchase {
    private readonly page: Page;
    private readonly cartLink: string = '[data-test="shopping-cart-link"]';
    private readonly checkoutButton: string = '[data-test="checkout"]';
    private readonly firstNameField: string = '[data-test="firstName"]';
    private readonly lastNameField: string = '[data-test="lastName"]';
    private readonly postalCodeField: string = '[data-test="postalCode"]';
    private readonly continueButton: string = '[data-test="continue"]';
    private readonly finishButton: string = '[data-test="finish"]';
    private readonly confirmationHeader: string = '[data-test="complete-header"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async openCart() {
        await this.page.locator(this.cartLink).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.postalCodeField).fill(postalCode);
    }

    public async continueToOverview() {
        await this.page.locator(this.continueButton).click();
    }

    public async finishPurchase() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateConfirmationMessage(expectedMessage: string) {
        const confirmationLocator = this.page.locator(this.confirmationHeader);
        await confirmationLocator.waitFor({ state: "visible" });
        const actualMessage = (await confirmationLocator.textContent())?.trim();

        if (actualMessage !== expectedMessage) {
            throw new Error(`Expected confirmation message to be "${expectedMessage}" but found "${actualMessage}"`);
        }
    }
}

