import { Page } from "@playwright/test"
import { expect } from '@playwright/test';


export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartIcon: string = 'a[class="shopping_cart_link"]'
    private readonly checkoutButton: string = 'button[id="checkout"]'

    constructor(page: Page) {
        this.page = page;
        
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
     async goToCheckout() {
    await this.page.click(this.cartIcon);
    await this.page.click(this.checkoutButton);
     }
}