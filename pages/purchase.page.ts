import { Page } from '@playwright/test';

export class Purchase {
  private readonly page: Page;
  private readonly cartLink: string = '.shopping_cart_link';
  private readonly checkoutButton: string = '#checkout';
  private readonly firstNameField: string = '[data-test="firstName"]';
  private readonly lastNameField: string = '[data-test="lastName"]';
  private readonly postalCodeField: string = '[data-test="postalCode"]';
  private readonly continueButton: string = '#continue';
  private readonly finishButton: string = '#finish';
  private readonly confirmationHeader: string = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  public async selectCart() {
    await this.page.locator(this.cartLink).click();
  }

  public async selectCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillInfo(firstName: string, lastName: string, zip: string) {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.postalCodeField).fill(zip);
  }

  public async selectContinue() {
    await this.page.locator(this.continueButton).click();
  }

  public async selectFinish() {
    await this.page.locator(this.finishButton).click();
  }

  public async validateConfirmation(expected: string) {
    const actual = await this.page.locator(this.confirmationHeader).textContent();
    if (!actual || actual.trim() !== expected.trim()) {
      throw new Error(`Expected confirmation text to be "${expected}" but got "${actual}"`);
    }
  }
}
