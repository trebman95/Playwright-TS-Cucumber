import { Page } from "@playwright/test";

export class PurchasePage {
  constructor(private readonly page: Page) {}

  private readonly addToCartBtn = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private readonly cartIcon = '.shopping_cart_link';
  private readonly checkoutBtn = '[data-test="checkout"]';
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly zipCodeField = '[data-test="postalCode"]';
  private readonly continueBtn = '[data-test="continue"]';
  private readonly finishBtn = '[data-test="finish"]';
  private readonly successMsg = '.complete-header';

  async addBackpackToCart() {
    await this.page.locator(this.addToCartBtn).click();
  }

  async proceedToCheckout() {
    await this.page.locator(this.cartIcon).click();
    await this.page.locator(this.checkoutBtn).click();
  }

  async enterCheckoutInfo(first: string, last: string, zip: string) {
    await this.page.fill(this.firstNameField, first);
    await this.page.fill(this.lastNameField, last);
    await this.page.fill(this.zipCodeField, zip);
    await this.page.click(this.continueBtn);
  }

  async finishPurchase() {
    await this.page.click(this.finishBtn);
  }

  async getSuccessMessage(): Promise<string> {
    const text = await this.page.locator(this.successMsg).textContent();
    return text?.trim() || "";
  }
}
