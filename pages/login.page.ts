import { expect, Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorMessageField: string = '.error-message-container'


    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        await expect((await this.page.title()).toString()).toEqual(expectedTitle);
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    public async validateErrorMessage(errorText: string) {
        await expect(this.page.getByText(errorText)).toBeVisible();
    }
}
