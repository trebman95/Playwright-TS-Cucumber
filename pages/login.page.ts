//import { expect, Page } from "@playwright/test"
//import { validateHeaderName } from "http"
import { Page } from "@playwright/test";

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
        const errorMessage = this.page.locator('h3[data-test="error"]'); //sngl elmt
        await errorMessage.waitFor({state: 'visible' }); 

        const actualMessage = (await errorMessage.textContent())?.trim() ?? '';

        if (!actualMessage.includes(expectedMessage)) {
          throw new Error(`Expected error message to include "${expectedMessage}" but found "${actualMessage}"`);
        }
    }
}