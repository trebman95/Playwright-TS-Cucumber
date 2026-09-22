import { Page } from '@playwright/test';

export class Purchase {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    public async clickCheckout() {
        await this.page.locator('#checkout').click();
    }

    public async enterCheckoutInformation() {
        await this.page.locator('#first-name').fill('Kranthi');
        await this.page.locator('#last-name').fill('Duggi');
        await this.page.locator('#postal-code').fill('27560');
    }

    public async clickContinue() {
        await this.page.locator('#continue').click();
    }

    public async clickFinish() {
        await this.page.locator('#finish').click();
    }

    public async validatePurchaseMessage(expectedMessage: string) {
        const actualMessage =
            await this.page.locator('.complete-header').innerText();

        if (actualMessage !== expectedMessage) {
            throw new Error(
                `Expected ${expectedMessage} but found ${actualMessage}`
            );
        }
    }
}