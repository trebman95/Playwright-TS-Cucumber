import { expect, Page } from "@playwright/test";

export class ProductDetails {
  private readonly page: Page;
  private readonly productDetailsContainer: string = ".inventory_details_container";
  private readonly productDetailsName: string = '[data-test="inventory-item-name"]';
  private readonly productDetailsDescription: string = '[data-test="inventory-item-desc"]';
  private readonly productDetailsPrice: string = '[data-test="inventory-item-price"]';
  private readonly productDetailsBackButton: string = '[data-test="back-to-products"]';
  private readonly addToCartButton: string = '#add-to-cart, [data-test="add-to-cart"]';
  private readonly removeButton: string = '#remove, [data-test="remove"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async IsProductDetailsPageOpened() {
    await expect(this.page).toHaveURL(/\/inventory-item\.html/);
    await expect(this.page.locator(this.productDetailsContainer)).toBeVisible();
  }

  public async IsProductDetailsPageShowingExpectedContent(expectedName: string, expectedDescription: string, expectedPrice: string) {
    await this.IsProductDetailsPageOpened();
    await expect(this.page.locator(this.productDetailsName)).toHaveText(expectedName);
    await expect(this.page.locator(this.productDetailsDescription)).toHaveText(expectedDescription);
    await expect(this.page.locator(this.productDetailsPrice)).toHaveText(expectedPrice);
  }

  public async ClickButtonByLabelOnProductDetailsPage(buttonLabel: string) {
    const normalized = buttonLabel.trim().toLowerCase();

    if (normalized.includes("back") && normalized.includes("produc")) {
      await this.page.locator(this.productDetailsBackButton).click();
      return;
    }

    let buttonSelector = "";
    
    if (normalized.includes("add")) {
      buttonSelector = this.addToCartButton;
    }
     else if (normalized.includes("remove")) {
      buttonSelector = this.removeButton;
    } 
    else {
      throw new Error(`Unsupported details page action "${buttonLabel}". Use "Add to Cart", "Remove", or "Back to products".`);
    }

    const button = this.page.locator(buttonSelector).first();
    
    if ((await button.count()) === 0) {
      throw new Error(`No "${buttonLabel}" button found on product details page`);
    }
    await button.click();
  }
}
