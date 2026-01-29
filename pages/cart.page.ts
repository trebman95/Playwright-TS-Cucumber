import { Page } from "@playwright/test"

export class Cart {
    private readonly page: Page
    private readonly cartItemLocator: string = '.cart_item'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    constructor(page: Page) {
        this.page = page;
    }

    public async proceedToCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async validateItemInCart(expectedItemName: string) {
        const cartItems = this.page.locator(this.cartItemLocator);
        const itemCount = await cartItems.count();
        let itemFound = false;

        for (let i = 0; i < itemCount; i++) {
            const itemName = await cartItems.nth(i).locator('.inventory_item_name').textContent();

            if (itemName === expectedItemName) {
                itemFound = true;
                break;
            }


            if (!itemFound) {
                throw new Error(`Expected item ${expectedItemName} not found in cart`);
            }
        
        }
    }

    
}

    