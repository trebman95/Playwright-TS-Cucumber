import { Page } from '@playwright/test';

export class CheckoutPage {
    private readonly page: Page;
    private readonly fristNameFieldSelector = 'input[data-test="firstName"]';
    private readonly lastNameFieldSelector = 'input[data-test="lastName"]';
    private readonly zipCodeFieldSelector = 'input[data-test="postalCode"]';
    private readonly continueButtonSelector = 'input[data-test="continue"]';
    private readonly finishButtonSelector = 'button[data-test="finish"]';
    private readonly successfulpurchaseTextselector = '.complete-header';
    private readonly cartIconSelector = 'div#shopping_cart_container';
    private readonly checkoutButtonSelector = '//*[@id="checkout"]';

    constructor(page: Page) {
        this.page = page;
    }
    public async selectCart() {
        await this.page.click(this.cartIconSelector);
    }

    public async selectcheckout() {
        await this.page.click(this.checkoutButtonSelector);
    }

    public async fillcheckoutInformation(firstName: string, lastName: string, zipCode: string) {
      await this.page.fill(this.fristNameFieldSelector, firstName);
      await this.page.fill(this.lastNameFieldSelector, lastName);
      await this.page.fill(this.zipCodeFieldSelector, zipCode);
    }
    public async continueCheckout() {
      await this.page.click(this.continueButtonSelector);
    }

public async finishcheckout() {
    await this.page.click(this.finishButtonSelector);
    }

public async validateSuccessfulPurchaseText(expectedText: string) {
    await this.page.waitForSelector(this.successfulpurchaseTextselector);
    const element = await this.page.$(this.successfulpurchaseTextselector);
    if (!element) {
      throw new Error('Successful purchase text element not found');
    }
    const textContent = await element.textContent();
    if (!textContent || !textContent.includes(expectedText)) {
      throw new Error(`Expected '${expectedText}' but got '${textContent}'`);
    }
  }
}



