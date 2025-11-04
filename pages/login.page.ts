import { Page } from "@playwright/test"
import { DEFAULT_TIMEOUT } from '../playwrightUtilities';

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorMessageSelector: string = 'div.error-message-container h3'

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
        // wait for fields to be visible before interacting to avoid timeouts
        await this.page.locator(this.userNameField).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.passwordField).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.userNameField).fill(userName);
        await this.page.locator(this.passwordField).fill(this.password);
        await this.page.locator(this.loginButton).click();
    }

    public async validateLoginErrorMessage(expectedMessage: string) {
    const locator = this.page.locator(this.errorMessageSelector);
    await locator.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const actual = (await locator.innerText())?.trim() ?? '';
        if (actual !== expectedMessage) {
            throw new Error(`Expected login error message to be "${expectedMessage}" but found "${actual}"`);
        }
    }
}