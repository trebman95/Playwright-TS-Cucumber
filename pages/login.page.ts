import { Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorMessage: string = 'h3[data-test="error"]'
    private readonly productsPageTitle: string = 'span.title'

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
        const actualMessage = await this.page.locator(this.errorMessage).textContent();
        if (actualMessage !== expectedMessage) {
            throw new Error(`Expected error message to be "${expectedMessage}" but found "${actualMessage}"`);
        }
    }

    public async validateProductsPageVisible() {
        const isVisible = await this.page.locator(this.productsPageTitle).isVisible();
        if (!isVisible) {
            throw new Error('Products page is not visible after login');
        }
    }

    public async loginWithCredentials(username: string, password: string) {
        await this.page.locator(this.userNameField).fill(username)
        await this.page.locator(this.passwordField).fill(password)
        await this.page.locator(this.loginButton).click()
    }
}