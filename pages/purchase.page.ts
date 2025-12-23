import { Page, expect } from "@playwright/test";

export class Purchase {
  private readonly page: Page;

  private readonly cartIcon = ".shopping_cart_link";
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly postalCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly successHeader = ".complete-header";

  constructor(page: Page) {
    this.page = page;
  }

  async openCart() {
    await this.page.locator(this.cartIcon).click();
  }

  async clickCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.postalCodeField).fill(postalCode);
  }

  async clickContinue() {
    await this.page.locator(this.continueButton).click();
  }

  async clickFinish() {
    await this.page.locator(this.finishButton).click();
  }

  async validateSuccessMessage(expectedMessage: string) {
    const header = this.page.locator(this.successHeader);
    await expect(header).toBeVisible();
    await expect(header).toHaveText(expectedMessage);
  }
}
