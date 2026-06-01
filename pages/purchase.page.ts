import { Page, expect } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartIcon: string = '.shopping_cart_link'
    private readonly checkoutButton: string = '[data-test="checkout"]'
    private readonly firstNameField: string = '[data-test="firstName"]'
    private readonly lastNameField: string = '[data-test="lastName"]'
    private readonly zipField: string = '[data-test="postalCode"]'
    private readonly continueButton: string = '[data-test="continue"]'
    private readonly finishButton: string = '[data-test="finish"]'
    private readonly successHeader: string = '.complete-header'

    constructor(page: Page) {
        this.page = page;
    }

    public async goToCart() {
        await this.page.locator(this.cartIcon).click();
    }

    public async goToCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    // Fills each field separately so it's clear which one failed.
    public async fillCheckoutForm(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.zipField).fill(zip);
    }

    public async continueCheckout() {
        await this.page.locator(this.continueButton).click();
    }

    public async finishCheckout() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateSuccessMessage(expectedMessage: string) {
        await expect(this.page.locator(this.successHeader)).toHaveText(expectedMessage);
    }
}
