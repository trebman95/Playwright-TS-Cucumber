import {expect, Page} from "@playwright/test"
import { Product } from "./product.page";
import {getPage} from "../playwrightUtilities";

export class Login {
    private readonly page: Page
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorField: string = 'h3[data-test="error"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string): Promise<void> {
        const pageTitle = await this.page.title();
        if (pageTitle !== expectedTitle) {
          throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
        }
    }

    public async loginAsUser(username: string, password: string): Promise<void> {
        await this.page.locator(this.userNameField).fill(username);
        await this.page.locator(this.passwordField).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    public async validateErrorMessage(result: string): Promise<void> {
        if (result === 'inventory page') {
            await new Product(getPage()).validateTitle();
        } else if (result === 'error message' || result === 'username required') {
            await expect(this.page.locator(this.errorField)).toBeVisible();
        }
    }
}