import { expect, Page } from "@playwright/test";

export class Purchase {
  private readonly page: Page;
  private readonly addToCart: string =
    'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly cartButton: string = '[data-test="shopping-cart-link"]';
  private readonly cartButtonBadge: string =
    '[data-test="shopping-cart-badge"]';
  private readonly checkoutButton: string = '[data-test="checkout"]';
  private readonly checkoutForm = {
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    zipCodeInput: '[data-test="postalCode"]',
  };
  private readonly continueButton: string = '[data-test="continue"]';
  private readonly finishButton: string = '[data-test="finish"]';
  private readonly checkoutCompleteContainer: string =
    '[data-test="checkout-complete-container"]';
  private readonly checkoutCompleteHeader: string =
    '[data-test="complete-header"]';
  private readonly checkoutCompleteText: string = '[data-test="complete-text"]';
  private readonly itemContainer: string = '[data-test="inventory-list"] > div';
  private readonly addToCartGeneric: string = 'button[id^="add-to-cart-"]';
  private readonly removeFromCartGeneric: string = 'button[id^="remove-"]';
  private readonly cartItem: string =
    '[data-test="cart-list"] [data-test="inventory-item"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async clickCartButton() {
    await this.page.locator(this.cartButton).click();
  }

  public async clickCheckoutButton() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillCheckoutForm(
    firstName: string,
    lastName: string,
    zipCode: string,
  ) {
    await this.page.locator(this.checkoutForm.firstNameInput).fill(firstName);
    await this.page.locator(this.checkoutForm.lastNameInput).fill(lastName);
    await this.page.locator(this.checkoutForm.zipCodeInput).fill(zipCode);
  }

  public async clickContinueButton() {
    await this.page.locator(this.continueButton).click();
  }

  public async clickFinishButton() {
    await this.page.locator(this.finishButton).click();
  }

  public async assertSuccessContainerVisible() {
    await expect(
      this.page.locator(this.checkoutCompleteContainer),
    ).toBeVisible();
  }

  public async assertSuccessHeaderCorrect(expectedText: string) {
    await expect(this.page.locator(this.checkoutCompleteHeader)).toHaveText(
      expectedText,
    );
  }

  public async assertSuccessTextCorrect(expectedText: string) {
    await expect(this.page.locator(this.checkoutCompleteText)).toHaveText(
      expectedText,
    );
  }

  public async addItemToShoppingCart(itemName: string) {
    await this.page
      .locator(this.itemContainer)
      .filter({ hasText: itemName })
      .locator(this.addToCartGeneric)
      .click();
  }

  public async assertShoppingCartBadgeCount(expectedCount: number) {
    await expect(
      this.page.locator(`${this.cartButton} ${this.cartButtonBadge}`),
    ).toHaveText(`${expectedCount}`);
  }

  public async assertItemIsVisibleInCart(itemName: string) {
    await expect(
      this.page.locator(this.cartItem).filter({ hasText: itemName }),
    ).toBeVisible();
  }

  public async removeItemFromCart(itemName: string) {
    await this.page
      .locator(this.itemContainer)
      .filter({ hasText: itemName })
      .locator(this.removeFromCartGeneric)
      .click();
  }

  public async assertItemIsNotVisibleInCart(itemName: string) {
    await expect(
      this.page.locator(this.cartItem).filter({ hasText: itemName }),
    ).toHaveCount(0);
  }
}
