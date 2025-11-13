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

    public async getErrorMessage(): Promise<string> {
        const errorLocator = this.page.locator('h3[data-test="error"]');
        return await errorLocator.textContent() || '';
    }

    public async validateSuccessfulLogin() {
        const inventoryContainer = this.page.locator('div[id="inventory_container"]');
        if (await inventoryContainer.count() === 0) {
          throw new Error('Login was not successful, inventory container not found');
        }
    }

    public async logout() {
        await this.page.locator('button[id="react-burger-menu-btn"]').click();
        await this.page.locator('a[id="logout_sidebar_link"]').click();
    }

    public async validateLoginPage() {
        const loginButton = this.page.locator(this.loginButton);
        if (await loginButton.count() === 0) {
          throw new Error('Not on the login page, login button not found');
        }
    }
}