import { expect, Page } from '@playwright/test';

export class Login {
    private readonly page: Page;
    private readonly defaultPassword = 'secret_sauce';
    private readonly passwordField = '[data-test="password"]';
    private readonly userNameField = '[data-test="username"]';
    private readonly loginButton = '[data-test="login-button"]';
    private readonly loginErrorMessage = '[data-test="error"]';
    private readonly productsTitle = '[data-test="title"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    public async loginAsUser(userName: string, password: string = this.defaultPassword) {
        await this.page.locator(this.userNameField).fill(userName);
        await this.page.locator(this.passwordField).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    public async validateLoginErrorMessage(expectedMessage: string) {
        await expect(this.page.locator(this.loginErrorMessage)).toHaveText(expectedMessage);
    }

    public async validateProductsPage() {
        await expect(this.page).toHaveURL(/\/inventory\.html$/);
        await expect(this.page.locator(this.productsTitle)).toHaveText('Products');
    }
}
