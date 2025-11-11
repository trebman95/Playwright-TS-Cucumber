import { Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
        private readonly pageTitle: string = '.login_logo'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        const browserTitle = await this.page.title();
        const elementTitle = await this.page.locator(this.pageTitle).textContent();

        const trimmedBrowserTitle = browserTitle.trim();
        const trimmedElementTitle = (elementTitle ?? '').trim();

        if (trimmedBrowserTitle !== trimmedElementTitle) {
        throw new Error(
            `Title mismatch: browser tab shows "${trimmedBrowserTitle}" but page element shows "${trimmedElementTitle}"`
        );
    }

    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    public async validateErrorMessage() {
        const errorMessageLocator = this.page.locator('h3[data-test="error"]');
        if (!await errorMessageLocator.isVisible()) {
            throw new Error('Expected error message to be visible, but it is not.');
        }
    }
}