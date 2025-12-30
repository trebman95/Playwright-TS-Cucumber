import { Page, expect } from "@playwright/test";

export class Product {
  private readonly page: Page;

  private readonly addToCart = '#add-to-cart-sauce-labs-backpack';
  private readonly cartLink = '[data-test="shopping-cart-link"]';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly postalCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly completeHeader = ".complete-header";

  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly priceLabels = ".inventory_item_price";

  constructor(page: Page) {
    this.page = page;
  }

  public async addBackPackToCart() {
    await this.page.locator(this.addToCart).click();
  }

  public async selectCart() {
    await this.page.locator(this.cartLink).click();
  }

  public async selectCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async fillInCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.postalCodeField).fill(postalCode);
  }

  public async selectContinue() {
    await this.page.locator(this.continueButton).click();
  }

  public async selectFinish() {
    await this.page.locator(this.finishButton).click();
  }

  public async validateOrderCompletion(expectedText = "Thank you for your order!") {
    await expect(this.page.locator(this.completeHeader)).toHaveText(expectedText);
  }

  public async sortItemsBy(value: string) {
    await this.page.selectOption(this.sortDropdown, value);
    // Ensure UI is ready before reading prices
    await this.page.locator(this.priceLabels).first().waitFor({ state: "visible" });
  }

  private async getProductPrices(): Promise<number[]> {
    const pricesText = await this.page.locator(this.priceLabels).allTextContents();
    const prices = pricesText.map((t) => Number(t.replace("$", "").trim()));

    if (prices.some((n) => Number.isNaN(n))) {
      throw new Error(`Failed to parse prices: ${pricesText.join(", ")}`);
    }

    return prices;
  }

  public async validatePricesSorted(direction: "asc" | "desc") {
    const prices = await this.getProductPrices();

    if (prices.length < 2) {
      throw new Error(`Need at least 2 products to validate sorting, found ${prices.length}`);
    }

    const expected = [...prices].sort((a, b) => (direction === "asc" ? a - b : b - a));

    const isCorrect = prices.every((p, i) => p === expected[i]);
    if (!isCorrect) {
      throw new Error(`Prices not sorted ${direction}. Actual: ${prices.join(", ")} Expected: ${expected.join(", ")}`);
    }
  }
}
