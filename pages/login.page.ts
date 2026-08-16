import { Page, expect } from '@playwright/test';

export class Login {
  constructor(private page: Page) {}

  async validateTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async loginAsUser(username: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', 'secret_sauce');
    await this.page.click('[data-test="login-button"]');
  }
}
