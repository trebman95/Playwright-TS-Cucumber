import { Page } from "@playwright/test";

export class Purchase {
  private readonly page: Page;
  private readonly cartIcon: string = 'a[class="shopping_cart_link"]';
  private readonly checkoutButton: string = 'button[id="checkout"]';
  private readonly firstNameField: string = 'input[id="first-name"]';
  private readonly lastNameField: string = 'input[id="last-name"]';
  private readonly postalCodeField: string = 'input[id="postal-code"]';
  private readonly continueButton: string = 'input[id="continue"]';
  private readonly finishButton: string = 'button[id="finish"]';
  private readonly thankYouMessage: string = 'h2[class="complete-header"]';
  private readonly cartBadge: string = 'span[class="shopping_cart_badge"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async validateCartBadgeShowsItems(expectedItems: number) {
    const cartBadge = await this.page.locator(this.cartBadge).textContent();
    if (cartBadge !== expectedItems.toString()) {
      throw new Error(
        `Expected cart badge to show "${expectedItems}" items, but got "${cartBadge}"`,
      );
    }
  }

  public async clickOnCartIcon() {
    await this.page.locator(this.cartIcon).click();
  }

  public async clickOnCheckoutButton() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillInCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, postalCode);
  }

  public async clickOnContinueButton() {
    await this.page.locator(this.continueButton).click();
  }

  public async clickOnFinishButton() {
    await this.page.locator(this.finishButton).click();
  }

  public async validateThankYouMessage() {
    const thankYouMessage = await this.page
      .locator(this.thankYouMessage)
      .textContent();
    if (thankYouMessage !== "Thank you for your order!") {
      throw new Error(
        `Expected thank you message to be "Thank you for your order!", but got "${thankYouMessage}"`,
      );
    }
  }
}
