import { expect, Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorMessage: string = 'h3[data-test="error"]'
    private readonly productsTitle: string = '[data-test="title"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle)
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    public async validateLoginErrorMessage(expectedErrorMessage: string) {
        await expect(this.page.locator(this.errorMessage)).toHaveText(expectedErrorMessage)
    }

    public async validateProductsPage() {
        await expect(this.page.locator(this.productsTitle)).toHaveText('Products')
    }
}
