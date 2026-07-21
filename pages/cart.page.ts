import { expect, Page } from "@playwright/test"

export class Cart {
    private readonly page: Page
    private readonly cartIcon: string = '.shopping_cart_link';
    private readonly checkoutButton: string = '#checkout';
    private readonly cartItems: string = '.cart_item';

    constructor(page: Page) {
        this.page = page;
    }

    public async openCart() {
        await this.page.locator(this.cartIcon).click();
    }

    public async validateProductInCart(expectedProduct: string) {
        await expect(this.page.locator(this.cartItems)).toContainText(expectedProduct);
    }

    public async proceedToCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }
}