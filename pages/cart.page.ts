import { expect, Page } from "@playwright/test";

export class Cart {
  private readonly page: Page;

  private readonly cartItems = ".cart_item";
  private readonly cartItemName = ".inventory_item_name";
  private readonly cartItemPrice = ".inventory_item_price";
  private readonly checkoutButton = "#checkout";
  private readonly continueShoppingButton = "#continue-shopping";

  constructor(page: Page) {
    this.page = page;
  }

  public async IsCartPageOpened() {
    await expect(this.page).toHaveURL(/\/cart\.html/);
  }

  public async IsCartPageContainingItemNamed(itemName: string) {
    const items = this.page.locator(this.cartItems);
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const row = items.nth(i);
      const actualName = (await row.locator(this.cartItemName).textContent())?.trim() ?? "";
      
      if (actualName === itemName) return;
    }

    throw new Error(`Cart item "${itemName}" not found on cart page`);
  }

  public async ClickCheckoutButton() {
    await this.page.locator(this.checkoutButton).click();
  }

  public async ClickContinueShoppingButton() {
    await this.page.locator(this.continueShoppingButton).click();
  }

  public async ClickCartPageButtonByLabel(actionLabel: string) {
    const normalized = actionLabel.trim().toLowerCase();
    switch (normalized) {
      case "checkout":
        await this.ClickCheckoutButton();
        return;
      case "continue shopping":
        await this.ClickContinueShoppingButton();
        return;
      default:
        throw new Error(`Unsupported cart action "${actionLabel}". Use "Checkout" or "Continue shopping".`);
    }
  }

  public async ClickRemoveButtonForCartItemNamed(itemName: string) {
    const items = this.page.locator(this.cartItems);
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const row = items.nth(i);
      const actualName = (await row.locator(this.cartItemName).textContent())?.trim() ?? "";
     
      if (actualName !== itemName) continue;

      const removeBtn = row.locator('button[id^="remove-"]');
      
      if ((await removeBtn.count()) === 0) {
        throw new Error(`Found cart row for "${itemName}" but no remove button`);
      }
      
      await removeBtn.first().click();
      return;
    }

    throw new Error(`Cart item "${itemName}" not found — cannot remove`);
  }

  public async ClickCartRowButtonByLabelForItemNamed(buttonLabel: string, itemName: string) {
    const normalized = buttonLabel.trim().toLowerCase();
    
    if (normalized !== "remove") {
      throw new Error(`Unsupported cart row action "${buttonLabel}". Use "Remove".`);
    }
    await this.ClickRemoveButtonForCartItemNamed(itemName);
  }

  public async IsCartPageNotContainingItemNamed(itemName: string) {
    const items = this.page.locator(this.cartItems);
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const row = items.nth(i);
      const actualName = (await row.locator(this.cartItemName).textContent())?.trim() ?? "";
      
      if (actualName === itemName) {
        throw new Error(`Expected "${itemName}" to be removed from cart, but it is still present`);
      }
    }
  }

  private async ReadCartLineItemRows(): Promise<{ Name: string; Price: string }[]> {
    const items = this.page.locator(this.cartItems);
    const count = await items.count();
    const result: { Name: string; Price: string }[] = [];

    for (let i = 0; i < count; i++) {
      const row = items.nth(i);
      const name = (await row.locator(this.cartItemName).textContent())?.trim() ?? "";
      const price = (await row.locator(this.cartItemPrice).textContent())?.trim() ?? "";
      result.push({ Name: name, Price: price });
    }

    return result;
  }

  public async IsCartPageContainingExactlyTheseItemNames(expectedNames: string[]) {
    const expected = expectedNames.map((n) => n.trim()).filter((n) => n.length > 0);
    const rows = await this.ReadCartLineItemRows();
    const actual = rows.map((r) => r.Name);

    if (actual.length !== expected.length) {
      throw new Error(`Expected ${expected.length} cart line(s), found ${actual.length}. Actual: ${actual.join(" | ")}`);
    }

    const missing = expected.filter((name) => !actual.includes(name));
    
    if (missing.length > 0) {
      throw new Error(`Missing cart item(s): ${missing.join(", ")}. Actual: ${actual.join(" | ")}`);
    }

    const extra = actual.filter((name) => !expected.includes(name));
    
    if (extra.length > 0) {
      throw new Error(`Unexpected cart item(s): ${extra.join(", ")}`);
    }
  }
}
