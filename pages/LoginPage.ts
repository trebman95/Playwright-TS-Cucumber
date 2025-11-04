import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  readonly url = 'https://www.saucedemo.com/';

  username = () => this.page.getByPlaceholder('Username');
  password = () => this.page.getByPlaceholder('Password');
  loginBtn = () => this.page.getByRole('button', { name: 'Login' });
  error = () => this.page.locator('[data-test="error"]');

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async login(user: string, pass: string) {
    await this.username().fill(user);
    await this.password().fill(pass);
    await this.loginBtn().click();
  }
}
