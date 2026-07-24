import { Page } from "@playwright/test";
export class Purchase {
  private readonly page: Page;
  private readonly cartIcon: string = ".shopping_cart_link";
  private readonly checkoutButton: string = 'button[id="checkout"]';
  private readonly firstNameField: string = 'input[id="first-name"]';
  private readonly lastNameField: string = 'input[id="last-name"]';
  private readonly postalCodeField: string = 'input[id="postal-code"]';
  private readonly continueButton: string = 'input[id="continue"]';
  private readonly finishButton: string = 'button[id="finish"]';
  private readonly completeHeader: string = ".complete-header";
  constructor(page: Page) {
    this.page = page;
  }
  public async selectCart() {
    await this.page.locator(this.cartIcon).click();
  }
  public async selectCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }
  public async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    zipCode: string,
  ) {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.postalCodeField).fill(zipCode);
  }
  public async selectContinue() {
    await this.page.locator(this.continueButton).click();
  }
  public async selectFinish() {
    await this.page.locator(this.finishButton).click();
  }
  public async validateSuccessfulPurchaseText(expectedText: string) {
    const actualText = await this.page
      .locator(this.completeHeader)
      .textContent();
    if (actualText !== expectedText) {
      throw new Error(
        `Expected text to be "${expectedText}" but found "${actualText}"`,
      );
    }
  }
}
