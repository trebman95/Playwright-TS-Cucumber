import { Page } from "@playwright/test";

export class Login {
  static readonly validPassword = "secret_sauce";
  static readonly invalidPassword = "wrong_password";
  private readonly page: Page;
  private readonly defaultPassword = Login.validPassword;
  private readonly userNameField = 'input[id="user-name"]';
  private readonly passwordField = 'input[id="password"]';
  private readonly loginButton = 'input[id="login-button"]';
  private readonly errorMessage = 'h3[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async IsLoginPageShowingTitle(expectedTitle: string) {
    const pageTitle = await this.page.title();
    
    if (pageTitle !== expectedTitle) {
      throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
    }
  }

  async FillCredentialsAndSubmitLoginForUser(userName: string) {
    await this.FillCredentialsAndSubmitLogin(userName, this.defaultPassword);
  }

  /** Maps feature keywords (valid, invalid, empty) to real passwords for readable scenarios. */
  ResolvePasswordFromScenarioType(passwordType: string): string {
    const t = passwordType.trim().toLowerCase();

    if (t === "" || t === "empty") {
      return "";
    }

    if (t === "valid" || t === "validate") {
      return Login.validPassword;
    }

    if (t === "invalid") {
      return Login.invalidPassword;
    }

    throw new Error(`Unknown password type "${passwordType}". Use valid, validate, invalid, empty, or leave blank.`);
  }

  async FillCredentialsAndSubmitLogin(userName: string, password: string) {
    await this.page.locator(this.userNameField).fill(userName);
    await this.page.locator(this.passwordField).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async IsLoginPageShowingErrorMessage(expectedErrorMessage: string) {
    const actual = (await this.page.locator(this.errorMessage).textContent())?.trim();
   
    if (actual !== expectedErrorMessage) {
      throw new Error(`Expected error message to be "${expectedErrorMessage}" but found "${actual}"`);
    }
  }
}
