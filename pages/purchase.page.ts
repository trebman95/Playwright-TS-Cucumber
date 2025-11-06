import { Page } from '@playwright/test';

export class Purchase {
  private readonly page: Page;
  private readonly cartLink = 'a.shopping_cart_link';
  private readonly checkoutButton = 'button[id="checkout"]';
  private readonly firstName = '#first-name';
  private readonly lastName = '#last-name';
  private readonly postalCode = '#postal-code';
  private readonly continueButton = '#continue';
  private readonly finishButton = '#finish';
  private readonly completeHeader = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  public async openCart() {
    await this.page.locator(this.cartLink).click();
  }

  public async clickCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillCheckoutInfo(first: string, last: string, zip: string) {
    await this.page.locator(this.firstName).fill(first);
    await this.page.locator(this.lastName).fill(last);
    await this.page.locator(this.postalCode).fill(zip);
  }

  public async clickContinue() {
    await this.page.locator(this.continueButton).click();
  }

  public async clickFinish() {
    await this.page.locator(this.finishButton).click();
  }

  public async getSuccessText(): Promise<string> {
    return (await this.page.locator(this.completeHeader).innerText()).trim();
  }
}
