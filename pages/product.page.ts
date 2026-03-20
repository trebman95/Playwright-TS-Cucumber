import { expect, Page } from "@playwright/test";

export class Product {
  private readonly page: Page;
  private readonly addToCartButton: string = 'button[id="add-to-cart-sauce-labs-backpack"]';
  private readonly sortDropdown: string = '[data-test="product-sort-container"]';
  private readonly productItems: string = ".inventory_item";
  private readonly productItemName: string = ".inventory_item_name";
  private readonly productItemPrice: string = ".inventory_item_price";
  private readonly cartBadge: string = ".shopping_cart_badge";
  private readonly cartLink: string = ".shopping_cart_link";

  constructor(page: Page) {
    this.page = page;
  }

  public async ClickAddSauceLabsBackpackToCart() {
    await this.page.locator(this.addToCartButton).click();
  }

  public async IsProductsPageOpened() {
    const title = await this.page.title();

    if (title !== "Swag Labs") {
      throw new Error(`Expected page title "Swag Labs" but found "${title}"`);
    }
  }

  public async IsProductPageContainingExpectedProductCount(expectedCount: number) {
    await expect(this.page.locator(this.productItems)).toHaveCount(expectedCount);
  }

  public async ClickProductSortDropdownButton() {
    await this.page.locator(this.sortDropdown).click();
  }

  public async IsSortDropdownContainingExpectedOptions(expectedOptions: string[]) {
    const options = await this.page.locator(`${this.sortDropdown} option`).allTextContents();
    const actualOptions: string[] = options.map((t) => t.trim()).filter((t) => t.length > 0);

    for (const expected of expectedOptions) {
      
      if (!actualOptions.includes(expected)) {
        throw new Error(`Missing sort option "${expected}". Actual options: ${actualOptions.join(" | ")}`);
      }
    }
  }

  public async SelectSortOptionByLabel(optionLabel: string) {
    await this.page.locator(this.sortDropdown).selectOption({ label: optionLabel });
  }

  public async IsProductSortDropdownVisible() {
    await expect(this.page.locator(this.sortDropdown)).toBeVisible();
  }

  public async IsSortDropdownShowingSelectedValue(expectedLabel: string) {
    const text = await this.page.locator(`${this.sortDropdown} option:checked`).textContent();
    const actualLabel = (text ?? "").trim();

    if (actualLabel !== expectedLabel) {
      throw new Error(`Expected selected sort value "${expectedLabel}" but found "${actualLabel}"`);
    }
  }

  public async IsProductListOrderedAsExpected(expected: { Name: string; Price: string }[]) {
    const items = this.page.locator(this.productItems);
    const count = await items.count();

    if (count !== expected.length) {
      throw new Error(`Expected ${expected.length} products, found ${count}`);
    }

    for (let index = 0; index < expected.length; index++) {
      const product = items.nth(index);
      const actualName = ((await product.locator(this.productItemName).textContent()) ?? "").trim();
      const actualPrice = ((await product.locator(this.productItemPrice).textContent()) ?? "").trim();

      const exp = expected[index];
     
      if (actualName !== exp.Name) {
        throw new Error(`${index} product: expected name "${exp.Name}" but got "${actualName}"`);
      }
     
      if (actualPrice !== exp.Price) {
        throw new Error(`${index} product: expected price "${exp.Price}" but got "${actualPrice}"`);
      }
    }
  }

  public async ClickAddToCartForProductNamed(itemName: string) {
    await this.ClickProductCardButtonByLabelForProductNamed("Add to Cart", itemName);
  }

  public async ClickProductCardButtonByLabelForProductNamed(buttonLabel: string, itemName: string) {
    const normalizedLabel = buttonLabel.trim().toLowerCase();
    const buttonSelector =
      normalizedLabel === "add to cart"
        ? 'button[id^="add-to-cart-"]'
        : normalizedLabel === "remove"
          ? 'button[id^="remove-"]'
          : "";

    if (!buttonSelector) {
      throw new Error(`Unsupported product action "${buttonLabel}". Use "Add to Cart" or "Remove".`);
    }

    const items = this.page.locator(this.productItems);
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const row = items.nth(i);
      const actualName = (await row.locator(".inventory_item_name").textContent())?.trim() ?? "";
     
      if (actualName !== itemName) continue;

      const button = row.locator(buttonSelector);
      
      if ((await button.count()) === 0) {
        throw new Error(`Found item "${itemName}" but no "${buttonLabel}" button`);
      }

      await button.first().click();
      return;
    }

    throw new Error(`Inventory item "${itemName}" not found`);
  }

  public async ClickShoppingCartBadgeToOpenCart() {
    await this.page.locator(this.cartLink).click();
  }

  public async IsShoppingCartBadgeShowingExpectedItemCount(expectedCount: number) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(String(expectedCount));
  }

  public async IsShoppingCartBadgeNotVisible() {
    await expect(this.page.locator(this.cartBadge)).toHaveCount(0);
  }

  public async ClickProductImageForProductNamed(itemName: string) {
    const items = this.page.locator(this.productItems);
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const row = items.nth(i);
      const actualName = (await row.locator(this.productItemName).textContent())?.trim() ?? "";
      
      if (actualName !== itemName) continue;
      
      await row.locator("img").first().click();
      return;
    }

    throw new Error(`Inventory item "${itemName}" not found`);
  }

}
