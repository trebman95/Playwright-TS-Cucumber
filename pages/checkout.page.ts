import { Page } from "@playwright/test"

export class Checkout {
    private readonly page: Page
    private readonly firstNameField: string = '#first-name';
    private readonly lastNameField: string = '#last-name';
    private readonly zipField: string = '#postal-code';
    private readonly continueButton: string = '#continue';
    private readonly finishButton: string = '#finish';
    private readonly confirmationText: string = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    public async fillInformation(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.zipField).fill(zip);
    }

    public async continueToOverview() {
        await this.page.locator(this.continueButton).click();
    }

    public async finishPurchase() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateConfirmationText(expectedText: string) {
        const actualText = await this.page.locator(this.confirmationText).textContent();
        if (actualText?.trim() !== expectedText) {
            throw new Error(`Expected confirmation text "${expectedText}" but found "${actualText}"`);
        }
    }
}