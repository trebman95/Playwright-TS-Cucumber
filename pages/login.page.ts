import { Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly error: string = '[data-test="error"]'
    private readonly productPage: string = '[data-test="title"]'

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
        await this.page.locator(this.loginButton).click();
    }

    public async validateError(expectedError: string) {
        const errorMessage = await this.page.locator(this.error).innerText();
        if (errorMessage !== expectedError) {
            throw new Error(`Expected error ${expectedError} but was ${errorMessage}`);
        }
    }

    public async validateProductPage(expectedHeader: string) {
        const pageHeader = await this.page.locator(this.productPage).innerText();
        if (pageHeader !== expectedHeader) {
            throw new Error(`Expected page ${expectedHeader} but was ${pageHeader}`);
        }
    }
}