import { Page } from "@playwright/test"

export class Menu {
    private readonly page: Page

    private readonly menuButton: string = '#react-burger-menu-btn'
    private readonly logoutLink: string = '#logout_sidebar_link'
    private readonly loginButton: string = '#login-button'

    constructor(page: Page) {
        this.page = page;
    }

    public async logout() {
        await this.page.locator(this.menuButton).click();
        await this.page.locator(this.logoutLink).click();
    }

    public async validateLoginPage() {
        const isLoginButtonVisible = await this.page.locator(this.loginButton).isVisible();

        if (!isLoginButtonVisible) {
            throw new Error('Login page is not displayed after logout');
        }
    }
}