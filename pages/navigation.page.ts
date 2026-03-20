import { DataTable } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";

export class Navigation {
  private readonly page: Page;

  private readonly navigationMenuButton: string = "#react-burger-menu-btn";
  private readonly navigationCloseButton: string = "#react-burger-cross-btn";
  private readonly navigationMenu: string = "div.bm-menu";
  private readonly navigationAllItemsLink: string = '[data-test="inventory-sidebar-link"]';
  private readonly navigationAboutLink: string = '[data-test="about-sidebar-link"]';
  private readonly navigationLogoutLink: string = '[data-test="logout-sidebar-link"]';
  private readonly navigationResetLink: string = '[data-test="reset-sidebar-link"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async ClickNavigationBarButton() {
    await this.page.locator(this.navigationMenuButton).click();
  }

  public async IsNavigationOpen() {
    await expect(this.page.locator(this.navigationMenu)).toBeVisible();
  }

  public async IsNavigationOptionsPresent(expectedOptions: string[]) {
    await this.IsNavigationOpen();

    const actualTexts = [
      (await this.page.locator(this.navigationAllItemsLink).textContent())?.trim() ?? "",
      (await this.page.locator(this.navigationAboutLink).textContent())?.trim() ?? "",
      (await this.page.locator(this.navigationLogoutLink).textContent())?.trim() ?? "",
      (await this.page.locator(this.navigationResetLink).textContent())?.trim() ?? "",
    ];

    const expected = expectedOptions.map((t) => t.trim()).filter((t) => t.length > 0);
    const missing = expected.filter((opt) => !actualTexts.includes(opt));
    
    if (missing.length > 0) {
      throw new Error(`Missing navigation option(s): ${missing.join(", ")}. Actual: ${actualTexts.join(" | ")}`);
    }
  }

  public async IsNavigationOptionsPresentFromTable(table: DataTable) {
    const options = table
      .rows()
      .map((r) => (r[0] ?? "").trim())
      .filter((v) => v.length > 0);

    if (options[0]?.toLowerCase() === "options") {
      options.shift();
    }

    await this.IsNavigationOptionsPresent(options);
  }

  public async ClickLogoutOption() {
    await this.page.locator(this.navigationLogoutLink).click();
  }

  public async ClickNavigationCloseButton() {
    await this.page.locator(this.navigationCloseButton).click();
  }

  public async IsNavigationClosed() {
    await expect(this.page.locator(this.navigationMenu)).toBeHidden();
  }
}

