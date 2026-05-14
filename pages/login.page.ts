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

    public async validateErrorMessage(expectedMessage: string) {
        const errorElement = this.page.locator('[data-test="error"]');
        const actualMessage = await errorElement.textContent();
        if (actualMessage !== expectedMessage) {
            throw new Error(`Expected error message "${expectedMessage}" but got "${actualMessage}"`);
        }
    }

    public async validateLoginFailed() {
        const loginButton = this.page.locator(this.loginButton);
        if (!(await loginButton.isVisible())) {
            throw new Error('Login should have failed, but login button is not visible');
        }
    }
}