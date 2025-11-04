import { Page } from "@playwright/test";
import { DEFAULT_TIMEOUT } from '../playwrightUtilities';

export class Cart {
  private readonly page: Page;
  private readonly cartLink: string = 'a.shopping_cart_link';
  private readonly cartBadge: string = '.shopping_cart_badge';
  private readonly cartItems: string = '.cart_item';
  private readonly cartItemName: string = '.inventory_item_name';

  constructor(page: Page) {
    this.page = page;
  }

  public async getCartCount(): Promise<number> {
    const badge = this.page.locator(this.cartBadge);
    if (await badge.count() === 0) return 0;
    const text = (await badge.innerText()).trim();
    const n = parseInt(text, 10);
    return Number.isNaN(n) ? 0 : n;
  }

  public async openCart() {
    const link = this.page.locator(this.cartLink);
    await link.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await link.click();
  }

  public async removeItem(itemName: string) {
    // Find cart item row that contains the itemName
    const itemRow = this.page.locator(this.cartItems, { hasText: itemName });
    await itemRow.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    // click the remove button inside that row
    const removeBtn = itemRow.locator('button');
    await removeBtn.click();
  }

  public async getCartItemNames(): Promise<string[]> {
    const rows = await this.page.locator(this.cartItems).all();
    const names = await Promise.all(rows.map(async r => (await r.locator(this.cartItemName).innerText()).trim()));
    return names;
  }

  public async cartBadgeVisible(): Promise<boolean> {
    const badge = this.page.locator(this.cartBadge);
    return (await badge.count()) > 0;
  }
}
