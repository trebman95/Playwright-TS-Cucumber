import { Page } from "@playwright/test";

export class Menu {
  constructor(private page: Page) {}

  async openMenu() {
    await this.page.locator("#react-burger-menu-btn").click();
    await this.page.waitForSelector("#reset_sidebar_link", {
      state: "visible",
    });
  }

  async resetAppState() {
    await this.page.locator("#reset_sidebar_link").click();
    await this.page.waitForTimeout(1000);
  }

  async isCartEmpty(): Promise<boolean> {
    const cartBadge = this.page.locator(".shopping_cart_badge");
    const isVisible = await cartBadge.isVisible();
    if (!isVisible) return true;
    const text = await cartBadge.textContent();
    return (text?.trim() ?? "0") === "0";
  }
}
