import { Page } from "@playwright/test";

export class Purchase {
  private readonly page: Page;
  private readonly addBackpackButton: string =
    'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly cartIcon: string = "[data-test='shopping-cart-link']";
  private readonly checkoutButton: string = 'button[data-test="checkout"]';
  private readonly firstNameField: string = 'input[data-test="firstName"]';
  private readonly lastNameField: string = 'input[data-test="lastName"]';
  private readonly zipField: string = 'input[data-test="postalCode"]';
  private readonly continueButton: string = 'input[data-test="continue"]';
  private readonly finishButton: string = 'button[data-test="finish"]';
  private readonly successHeader: string = ".complete-header";

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackpackToCart() {
    await this.page.locator(this.addBackpackButton).click();
  }

  public async clickCart() {
    await this.page.locator(this.cartIcon).click();
  }

  public async clickCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillUserInfo() {
    await this.page.locator(this.firstNameField).fill("Shikha");
    await this.page.locator(this.lastNameField).fill("Pandey");
    await this.page.locator(this.zipField).fill("48226");
  }

  public async clickContinue() {
    await this.page.locator(this.continueButton).click();
  }

  public async clickFinish() {
    await this.page.locator(this.finishButton).click();
  }

  public async validateThankYouMessage(expectedMessage: string) {
    const actualMessage = await this.page
      .locator(this.successHeader)
      .textContent();
    if (actualMessage?.trim() !== expectedMessage) {
      throw new Error(
        `Expected message to be "${expectedMessage}" but found "${actualMessage}"`
      );
    }
  }
}
