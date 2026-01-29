import { Page } from '@playwright/test';

export class Purchase {
  private readonly page: Page;

  private readonly cartLink = '.shopping_cart_link';
  private readonly checkoutButton = 'button[data-test="checkout"]';

  private readonly firstNameField = 'input[data-test="firstName"]';
  private readonly lastNameField = 'input[data-test="lastName"]';
  private readonly zipField = 'input[data-test="postalCode"]';

  private readonly continueButton = 'input[data-test="continue"]';
  private readonly finishButton = 'button[data-test="finish"]';

  private readonly completeHeader = 'h2[data-test="complete-header"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator(this.cartLink).click();
  }

  async clickCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zip: string) {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.zipField).fill(zip);
  }

  async clickContinue() {
    await this.page.locator(this.continueButton).click();
  }

  async clickFinish() {
    await this.page.locator(this.finishButton).click();
  }

  async validateThankYou(expectedText: string) {
    const actual = (await this.page.locator(this.completeHeader).textContent())?.trim() ?? '';
    if (!actual.includes(expectedText)) {
      throw new Error(`Expected "${expectedText}" but found "${actual}"`);
    }
  }

  async removeBackpackFromCart() {
    await this.page.locator('button[data-test="remove-sauce-labs-backpack"]').click();
  }

  async validateCartIsEmpty() {
    const count = await this.page.locator('.cart_item').count();
    if (count !== 0) {
      throw new Error(`Expected cart to be empty but found ${count} item(s)`);
    }
  }
}
