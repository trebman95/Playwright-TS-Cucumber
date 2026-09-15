import { expect, Page } from "@playwright/test";

export class Purchase {
  private readonly page: Page;

  // Checkout locators are kept in the page object instead of the step file.
  private readonly cartLink = '[data-test="shopping-cart-link"]';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly postalCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly successfulPurchaseMessage = '[data-test="complete-header"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async openCart() {
    await this.page.locator(this.cartLink).click();
  }

  public async proceedToCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    // Synthetic data is supplied by the feature file and reused by this method.
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.postalCodeField).fill(postalCode);
  }

  public async continueCheckout() {
    await this.page.locator(this.continueButton).click();
  }

  public async finishPurchase() {
    await this.page.locator(this.finishButton).click();
  }

  public async validateSuccessfulPurchaseMessage(expectedMessage: string) {
    // The confirmation header is the final assertion for a completed order.
    await expect(this.page.locator(this.successfulPurchaseMessage)).toHaveText(
      expectedMessage,
    );
  }
}
