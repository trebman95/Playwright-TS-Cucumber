import { Page } from "@playwright/test"

export class CheckoutStepOne {
    private readonly page: Page
    private readonly checkoutInfoContainer: string = '#checkout_info_container'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = '#continue'

    constructor(page: Page) {
        this.page = page;
    }

    public async fillFirstName(firstName: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
    }

    public async fillLastName(lastName: string) {
        await this.page.locator(this.lastNameField).fill(lastName);
    }

    public async fillPostalCode(postalCode: string) {
        await this.page.locator(this.postalCodeField).fill(postalCode);
    }

    public async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    public async clickContinue() {
        await this.page.locator(this.continueButton).click();
    }
}
