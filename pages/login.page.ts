import { Page, expect } from "@playwright/test";

export class Login {
  private readonly page: Page;

  private readonly password = "secret_sauce";
  private readonly passwordField = "#password";
  private readonly userNameField = "#user-name";
  private readonly loginButton = "#login-button";
  private readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async validateTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  public async loginAsUser(userName: string) {
    await this.page.locator(this.userNameField).fill(userName);
    await this.page.locator(this.passwordField).fill(this.password);
    await this.page.locator(this.loginButton).click();
  }

  public async validateErrorMessage(expectedMessage: string) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(expectedMessage);
  }

  public async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }
}
