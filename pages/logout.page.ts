import {Page} from "@playwright/test"

export class Logout {
    private readonly page: Page
    private readonly hamburgerMenu: string = 'button[id="react-burger-menu-btn"]'
    private readonly logoutLink: string = 'a[data-test="logout-sidebar-link"]'
    constructor(page: Page) {
        this.page = page;
    }

    public async logout(): Promise<void> {
        await this.page.locator(this.hamburgerMenu).click();
        await this.page.locator(this.logoutLink).click();
    }
}