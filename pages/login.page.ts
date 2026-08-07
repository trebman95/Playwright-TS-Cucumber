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
        await this.page.locator(this.userNameField).fill(userName);
        await this.page.locator(this.passwordField).fill(this.password);
        await this.page.locator(this.loginButton).click({ noWaitAfter: true });
        // Wait for navigation to the inventory page after successful login, but ignore if login fails (e.g., locked out user).

        try {
            await this.page.waitForURL('**/inventory.html', { timeout: 5000 });
        } catch (e) {
            // Navigation didn't happen, likely due to login error; continue without throwing.
        }
    }

  public async validateErrorMessage(expectedMessage: string) {
        const errorLocator = this.page.locator('[data-test="error"]');
        const visible = await errorLocator.isVisible();
        if (!visible) {
            throw new Error('Error message is not visible');
        }
        const actualMessage = await errorLocator.textContent();
        if (actualMessage?.trim() !== expectedMessage.trim()) {
            throw new Error(`Expected error message to be "${expectedMessage}" but got "${actualMessage}"`);
        }
    }
}