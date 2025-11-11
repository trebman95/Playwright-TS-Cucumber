import { Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        const pageTitle = await this.page.title();
        if (pageTitle !== expectedTitle) {
          throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
        }
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    private async getLoginButtonContainer() {
        return this.page.locator('#login_button_container');
    }

    private async getErrorMessageContainer() {
        const loginContainer = await this.getLoginButtonContainer();
        return loginContainer.locator('div.error-message-container.error').first();
    }

    public async getErrorMessage(): Promise<string> {
        const errorContainer = await this.getErrorMessageContainer();
        const errorMessage = await errorContainer.locator('h3').textContent();
        return errorMessage || '';
    }
}