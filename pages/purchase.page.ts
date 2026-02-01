import { Page } from "@playwright/test";

export class Purchase {
  private readonly page: Page;

  private readonly cartIcon = '.shopping_cart_link';
  private readonly checkoutButton = '[data-test="checkout"]';

  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly postalCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';

  private readonly finishButton = '[data-test="finish"]';
  private readonly thankYouHeader = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  public async openCart() {
    await this.page.locator(this.cartIcon).click();
  }

  public async checkout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillShippingInfo(first: string, last: string, zip: string) {
    await this.page.locator(this.firstNameField).fill(first);
    await this.page.locator(this.lastNameField).fill(last);
    await this.page.locator(this.postalCodeField).fill(zip);
  }

  public async continue() {
    await this.page.locator(this.continueButton).click();
  }

  public async finish() {
    await this.page.locator(this.finishButton).click();
  }

  public async validateThankYouText(expected: string) {
    const actual = await this.page.locator(this.thankYouHeader).innerText();
    if (actual.trim() !== expected.trim()) {
      throw new Error(`Expected "${expected}" but found "${actual}"`);
    }
  }
}
