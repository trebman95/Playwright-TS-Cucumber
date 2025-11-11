import { Page, expect } from "@playwright/test";

export class Product {
  private readonly page: Page;

  // Element selectors
  private readonly addBackpackBtn = 'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly cartIcon = '.shopping_cart_link';
  private readonly checkoutBtn = '#checkout';
  private readonly firstNameInput = '#first-name';
  private readonly lastNameInput = '#last-name';
  private readonly postalCodeInput = '#postal-code';
  private readonly continueBtn = '#continue';
  private readonly finishBtn = '#finish';
  private readonly confirmationHeader = '.complete-header';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart(): Promise<void> {
    await this.page.waitForSelector(this.addBackpackBtn, { state: 'visible' });
    await this.page.locator(this.addBackpackBtn).click();
  }

  public async openCart(): Promise<void> {
    await this.page.locator(this.cartIcon).click();
  }

  // ✅ Proceed to checkout
  public async proceedToCheckout(): Promise<void> {
    await this.page.locator(this.checkoutBtn).click();
  }

  public async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  public async continueToOverview(): Promise<void> {
    await this.page.locator(this.continueBtn).click();
  }

  public async finishPurchase(): Promise<void> {
    await this.page.locator(this.finishBtn).click();
  }

  public async validateConfirmationMessage(expectedText: string): Promise<void> {
    const confirmation = await this.page.locator(this.confirmationHeader).textContent();
    expect(confirmation?.trim()).toBe(expectedText);
  }
}