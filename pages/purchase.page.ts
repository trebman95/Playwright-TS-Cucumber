import { expect, Page } from '@playwright/test';

export class Purchase {
  private readonly page: Page;
  private readonly cartLink = '[data-test="shopping-cart-link"]';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly postalCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly confirmationHeader = '[data-test="complete-header"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async openCart() {
    await this.page.locator(this.cartLink).click();
  }

  public async startCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillCheckoutInformation(firstName: string, lastName: string, zipCode: string) {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.postalCodeField).fill(zipCode);
  }

  public async continueCheckout() {
    await this.page.locator(this.continueButton).click();
  }

  public async finishCheckout() {
    await this.page.locator(this.finishButton).click();
  }

  public async validatePurchaseConfirmationText(expectedText: string) {
    await expect(this.page.locator(this.confirmationHeader)).toHaveText(expectedText);
  }
}
