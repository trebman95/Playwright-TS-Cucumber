import { expect, Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorMsg: string = '[data-test="error"]'

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
        await this.page.screenshot({path: './screenshots/login_page.jpg'})
        await this.page.locator(this.loginButton).click()
    }

    public async validateErrorMsg(exp_errorMsg: string){
        const act_errorMsg = await this.page.locator(this.errorMsg).textContent();
        expect(act_errorMsg).toBe(exp_errorMsg);
        await this.page.screenshot({path: './screenshots/error_message_in_login_page.jpg'})
    }
}