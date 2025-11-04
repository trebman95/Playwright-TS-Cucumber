import { Page, expect } from "@playwright/test";

export class CheckoutConfirmation {
    private readonly page: Page;
    private readonly pageTitleLocatoe: string = 'span[class="title"]';
    private readonly finishButtonLocator: string = 'button[id="finish"]';
    private readonly firstNameLocator: string = 'input[id="first-name"]';
    private readonly lastNameLocator: string = 'input[id="last-name"]';
    private readonly postalCodeLocator: string = 'input[id="postal-code"]';
    private readonly continueButtonLocator: string = 'input[type="submit"]';
    private readonly orderCompletedLocator: string = 'h2[class="complete-header"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitleOfPage(expectedTitle: string) {
        const pageTitle = await this.page.locator(this.pageTitleLocatoe).textContent();
        if (pageTitle !== expectedTitle) {
          throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
        }
    }

    public async fillInCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameLocator).fill(firstName);
        await this.page.locator(this.lastNameLocator).fill(lastName);
        await this.page.locator(this.postalCodeLocator).fill(postalCode);
    }

    public async clickContinueButton() {
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.continueButtonLocator).click();
    }

    public async clickFinishButton() {
        await this.page.locator(this.finishButtonLocator).click();
    }

    public async validateSuccessMessage(expectedMessage: string) {
        const successMessageLocator = this.page.locator(this.orderCompletedLocator);
        await expect(successMessageLocator).toHaveText(expectedMessage);
    }
    
}