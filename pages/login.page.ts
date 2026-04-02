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

        // Wait for navigation to inventory page (or error message).
        await Promise.race([
            this.page.waitForURL('**/inventory.html', { timeout: 10000 }),
            this.page.locator('[data-test="error"]').waitFor({ state: 'visible', timeout: 10000 })
        ]).catch(() => null);

        // If login succeeded, ensure inventory content is visible.
        if (this.page.url().includes('/inventory.html')) {
            await this.page.waitForSelector('.inventory_list', { timeout: 10000 });
        }
    }

    public async validateProductsPage(expectedHeader: string) {
        const actualHeader = (await this.page.locator('.title').textContent())?.trim() || '';
        if (actualHeader !== expectedHeader) {
            throw new Error(`Expected products page header to be "${expectedHeader}" but found "${actualHeader}"`);
        }
    }

    public async validateErrorMessage(expectedError: string) {
        const errorLocator = this.page.locator('[data-test="error"]');
        const actualError = (await errorLocator.textContent())?.trim() || '';

        if (actualError !== expectedError) {
            throw new Error(`Expected login error to be "${expectedError}" but found "${actualError}"`);
        }
    }
}