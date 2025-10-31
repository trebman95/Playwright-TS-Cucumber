import { Page, Locator, expect } from '@playwright/test';

export class Purchase {
  private readonly page: Page;
  private readonly addToCartButton: string = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private readonly cartIcon: string = '.shopping_cart_link';
  private readonly checkoutButton: string = '[data-test="checkout"]';
  private readonly firstNameField: string = '[data-test="firstName"]';
  private readonly lastNameField: string = '[data-test="lastName"]';
  private readonly postalCodeField: string = '[data-test="postalCode"]';
  private readonly continueButton: string = '[data-test="continue"]';
  private readonly finishButton: string = '[data-test="finish"]';
  private readonly confirmationMessage: string = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  public async addProductToCart() {
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.addToCartButton).click();
  }

  public async openCart() {
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.cartIcon).click();
  }

  public async checkoutInformation(firstName: string, lastName: string, zip: string) {
    await this.page.waitForTimeout(3000);

    await this.page.locator(this.checkoutButton).click();

    await this.page.waitForURL('**/checkout-step-one.html', { timeout: 10000 });
    await this.page.waitForSelector(this.firstNameField, { state: 'visible', timeout: 10000 });

    await this.page.waitForTimeout(3000);
    
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, zip);

    await this.page.waitForTimeout(3000);

    await this.page.locator(this.continueButton).click();

    await this.page.waitForTimeout(3000);

    await this.page.waitForURL('**/checkout-step-two.html', { timeout: 10000 });
  }

  public async completePurchase() {
    await this.page.locator(this.finishButton).click();

    await this.page.waitForTimeout(3000);
  }

  public async validatePurchaseMessage(expectedMessage: string) {
    const message = await this.page.locator(this.confirmationMessage).textContent();
    if (!message?.includes(expectedMessage)) {
      throw new Error(`Expected message to contain "${expectedMessage}" but found "${message}"`);
    }
  }
}
