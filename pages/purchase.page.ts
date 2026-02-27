import { Page, expect } from "@playwright/test";

export class Purchase {
  private readonly page: Page;

  private readonly cartButton = ".shopping_cart_link";
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly postalCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly successMessage = ".complete-header";

  constructor(page: Page) {
    this.page = page;
  }

  public async selectCart() {
    await this.page.locator(this.cartButton).click();
  }

  public async selectCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillCustomerInfo() {
    await this.page.locator(this.firstNameField).fill("Bob");
    await this.page.locator(this.lastNameField).fill("QA");
    await this.page.locator(this.postalCodeField).fill("12345");
  }

  public async selectContinue() {
    await this.page.locator(this.continueButton).click();
  }

  public async selectFinish() {
    await this.page.locator(this.finishButton).click();
  }

  public async validateSuccessMessage(expectedText: string) {
    const message = await this.page.locator(this.successMessage).textContent();
    await expect(message?.trim()).toBe(expectedText);
  }
}
