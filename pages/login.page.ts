import { Page, expect } from "@playwright/test";

export class Login {
    private readonly page: Page;
    private readonly password: string = 'secret_sauce';
    private readonly passwordField: string = 'input[id="password"]';
    private readonly userNameField: string = 'input[id="user-name"]';
    private readonly loginButton: string = 'input[id="login-button"]';
    private readonly errorMessage: string = '[data-test="error"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateToLogin() {
        await this.page.goto('https://www.saucedemo.com/');
        await this.page.waitForLoadState('domcontentloaded');

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
        await this.page.locator(this.loginButton).click();

        const navigationPromise = this.page.waitForURL('**/inventory.html', { timeout: 8000 }).then(() => 'success').catch(() => null);

        const errorPromise = this.page.locator(this.errorMessage).waitFor({ state: 'visible', timeout: 8000 }).then(() => 'error').catch(() => null);

        await this.page.waitForTimeout(3000);

        const result = await Promise.race([navigationPromise, errorPromise]);

        await this.page.waitForTimeout(3000);
    }

    public async validateErrorMessage(expectedError: string) {
        const errorText = await this.page.locator(this.errorMessage).textContent();
        if (!errorText?.includes(expectedError)) {
            throw new Error(`Expected error message to contain "${expectedError}" but found "${errorText}"`);
        }
    }
}
