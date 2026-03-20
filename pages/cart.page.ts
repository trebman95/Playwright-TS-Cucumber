import { Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;

  private readonly cartIcon = '.shopping_cart_link';
  private readonly checkoutBtn = '#checkout';

  constructor(page: Page) {
    this.page = page;
  }

      //purchase flow
  async open() {
    await this.page.locator(this.cartIcon).click();
  }

  async startCheckout() {
    await this.page.locator(this.checkoutBtn).click();
  }
}