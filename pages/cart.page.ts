import { Page } from "@playwright/test"

export class Cart {
    private readonly page: Page
    private readonly cartBadge: string = '.shopping_cart_badge'
    private readonly removeBackpack: string = 'button[id="remove-sauce-labs-backpack"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateCartBadgeCount(expectedCount: string) {
        const badgeText = await this.page.locator(this.cartBadge).textContent();
        if (badgeText?.trim() !== expectedCount) {
            throw new Error(`Expected cart badge to show "${expectedCount}" but found "${badgeText?.trim()}"`);
        }
    }

    public async removeBackpackFromCart() {
        await this.page.locator(this.removeBackpack).click();
    }

    public async validateCartBadgeNotVisible() {
        const isVisible = await this.page.locator(this.cartBadge).isVisible();
        if (isVisible) {
            throw new Error('Expected cart badge to not be visible but it is visible');
        }
    }
}
