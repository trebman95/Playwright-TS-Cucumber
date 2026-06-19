import { Page } from '@playwright/test';

export class MenuPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMenu() {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async clickLogout() {
    await this.page.locator('#logout_sidebar_link').click();
  }
}