import { Page, expect } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorBanner: string = '[data-test="error"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    // toContainText checks for a partial match so minor wording changes don't break the test.
    public async validateErrorContains(fragment: string) {
        await expect(this.page.locator(this.errorBanner)).toContainText(fragment);
    }

    // Checks the URL to confirm the page actually navigated, not just that something appeared.
    public async validateCurrentUrl(urlFragment: string) {
        await expect(this.page).toHaveURL(new RegExp(urlFragment));
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName);
        await this.page.locator(this.passwordField).fill(this.password);
        await this.page.locator(this.loginButton).click();
    }
}
