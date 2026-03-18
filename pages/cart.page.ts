import { expect, Page } from "@playwright/test";

export class Cart {
    private readonly page: Page
    private readonly firstNameField: string = '#first-name';
    private readonly lastNameField: string = '#last-name';
    private readonly postalCodeField: string = '#postal-code';
    private readonly thankYouMessage: string = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    public async clickOnCheckout() {
        await this.page.getByRole('button', { name: 'Checkout' }).click();
    }

    public async fillPersonalDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.postalCodeField).fill(postalCode);
        await this.page.screenshot({path: './screenshots/personal_details_checkout.jpg'})
    }

    public async clickOnContinue() {
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    public async clickOnFinish() {
        await this.page.getByRole('button', { name: 'Finish' }).click();
    }

    public async validateThankYouMessage(exp_message: string) {
        await expect(this.page.locator(this.thankYouMessage)).toHaveText(exp_message);
        await this.page.screenshot({path: './screenshots/thankYou_Message.jpg'})
    }
}