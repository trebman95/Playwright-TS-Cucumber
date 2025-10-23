import { Page } from "@playwright/test"

export class Cart {
    private readonly page: Page
    private readonly cartIcon: string = 'a.shopping_cart_link'
    private readonly cartItems: string = 'div.cart_item'
    private readonly continueShoppingButton: string = 'button[id="continue-shopping"]'
    private readonly removeButtons: string = 'button[class*="cart_button"]'
    private readonly productsPageTitle: string = 'span.title'

    constructor(page: Page) {
        this.page = page;
    }

    public async selectCart() {
        await this.page.locator(this.cartIcon).click()
    }

    public async validateCartItemCount(expectedCount: string) {
        const items = await this.page.locator(this.cartItems).all()
        const actualCount = items.length.toString()
        if (actualCount !== expectedCount) {
            throw new Error(`Expected ${expectedCount} items in cart but found ${actualCount}`)
        }
    }

    public async removeAllItemsFromCart() {
        let removeButtonElements = await this.page.locator(this.removeButtons).all()
        while (removeButtonElements.length > 0) {
            await removeButtonElements[0].click()
            await this.page.waitForTimeout(500);
            removeButtonElements = await this.page.locator(this.removeButtons).all()
        }
    }

    public async validateCartIsEmpty() {
        const items = await this.page.locator(this.cartItems).all()
        if (items.length > 0) {
            throw new Error(`Expected cart to be empty but found ${items.length} items`)
        }
    }

    public async selectContinueShopping() {
        await this.page.locator(this.continueShoppingButton).click()
    }

    public async validateProductsPageVisible() {
        const isVisible = await this.page.locator(this.productsPageTitle).isVisible();
        if (!isVisible) {
            throw new Error('Products page is not visible');
        }
    }
}
