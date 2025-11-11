import { Page } from "@playwright/test";

export class PurchasePage {
  constructor(private page: Page) {}

  addBackpackToCart() {
    return this.page.click("#add-to-cart-sauce-labs-backpack");
  }

  clickCartIcon() {
    return this.page.click(".shopping_cart_link");
  }

  clickCheckout() {
    return this.page.click("#checkout");
  }

  async enterCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill("#first-name", firstName);
    await this.page.fill("#last-name", lastName);
    await this.page.fill("#postal-code", postalCode);
  }

  clickContinue() {
    return this.page.click("#continue");
  }

  clickFinish() {
    return this.page.click("#finish");
  }

  getConfirmationMessage() {
    return this.page.locator(".complete-header");
  }
}
