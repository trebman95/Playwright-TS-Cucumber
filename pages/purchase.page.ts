import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    
    constructor(page: Page) {
        this.page = page;
    }

    public async proceedToCheckout() {
        await this.page.locator('a[class="shopping_cart_link"]').click();
        await this.page.locator('button[id="checkout"]').click();
    }

    public async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator('input[id="first-name"]').fill(firstName);
        await this.page.locator('input[id="last-name"]').fill(lastName);
        await this.page.locator('input[id="postal-code"]').fill(postalCode);
        await this.page.locator('input[id="continue"]').click();
    }
}