import { expect, Page } from "@playwright/test";

export class Login {
  private readonly page: Page;

  // Locators and shared credentials used by the login scenarios.
  private readonly password: string = "secret_sauce";
  private readonly passwordField: string = 'input[id="password"]';
  private readonly userNameField: string = 'input[id="user-name"]';
  private readonly loginButton: string = 'input[id="login-button"]';
  private readonly errorMessage: string = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  public async validateTitle(expectedTitle: string) {
    // Read the HTML document title rather than visible text on the page.
    const pageTitle = await this.page.title();
    if (pageTitle !== expectedTitle) {
      throw new Error(
        `Expected title to be ${expectedTitle} but found ${pageTitle}`,
      );
    }
  }

  public async loginAsUser(userName: string) {
    await this.page.locator(this.userNameField).fill(userName);
    await this.page.locator(this.passwordField).fill(this.password);
    await this.page.locator(this.loginButton).click();
  }

  public async validateLoginErrorMessage(expectedMessage: string) {
    // Playwright assertions automatically wait for the message to appear.
    await expect(this.page.locator(this.errorMessage)).toHaveText(
      expectedMessage,
    );
  }
}
