import { Page } from "@playwright/test"
import exp from "node:constants";

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorBox:string = 'h3[data-test="error"]'

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

    public async validateUrl(expectedUrl:string)
    {
        const pageUrl = this.page.url();
        if (pageUrl !== expectedUrl)
        {
            throw new Error(`Expected url to be ${expectedUrl} but found ${pageUrl}`)
        }
    }

    public async validateError(expectedError: string)
    {
        const errorText:string|null = await this.page.locator(this.errorBox).textContent()

        // const errorText:string|null = await this.page.locator("").getAttribute("dir")

        if (errorText !== expectedError)
        {
            throw new Error(`Expected error to be "${expectedError}" but found "${errorText}"`)
        }
    }
}


