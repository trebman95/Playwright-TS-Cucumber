import { Page, expect } from '@playwright/test';

export class Purchase {
  private readonly page: Page;

  private readonly backpackAddButton = 'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly cartIcon = 'a.shopping_cart_link';
  private readonly checkoutButton = 'button[id="checkout"]';
  private readonly firstNameField = 'input[id="first-name"]';
  private readonly lastNameField = 'input[id="last-name"]';
  private readonly zipField = 'input[id="postal-code"]';
  private readonly continueButton = 'input[id="continue"]';
  private readonly finishButton = 'button[id="finish"]';
  private readonly confirmationText = 'h2[class="complete-header"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackpack() {
    await this.page.click(this.backpackAddButton);
  }

  public async openCart() {
    await this.page.click(this.cartIcon);
  }

  public async checkout() {
    await this.page.click(this.checkoutButton);
  }

  public async fillCheckoutInfo(firstName: string, lastName: string, zip: string) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.zipField, zip);
  }

  public async continueCheckout() {
    await this.page.click(this.continueButton);
  }

  public async finishCheckout() {
    await this.page.click(this.finishButton);
  }

  public async validateConfirmation(expectedText: string) {
    const confirmation = this.page.locator(this.confirmationText);
    await expect(confirmation).toHaveText(expectedText);
  }
}