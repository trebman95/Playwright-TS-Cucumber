import { Page, expect } from '@playwright/test';

export class Checkout { 
    constructor(private readonly page: Page) {}

    private cartIcon = '.shopping_cart_link';
    private checkoutBtn = '[data-test="checkout"]';
    private first = '[data-test="firstName"]';
    private last = '[data-test="lastName"]'
    private zip = '[data-test="postalCode"]';
    private continueBtn = '[data-test="continue"]';
    private finishBtn = '[data-test="finish"]';
    private successHeader = '.complete-header';

    async openCart() {
        await this.page.locator(this.cartIcon).click();
    }

    async clickCheckout() {
        await this.page.locator(this.checkoutBtn).click();
    }   

    async fillInfo(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.first).fill(firstName);
        await this.page.locator(this.last).fill(lastName);
        await this.page.locator(this.zip).fill(zip);
    }

    async clickContinue() {
        await this.page.locator(this.continueBtn).click();
    }

    async clickFinish() {
        await this.page.locator(this.finishBtn).click();
    }

    async expectSuccess(expected = 'Thank you for your order!') {
        await expect(this.page.locator(this.successHeader)).toHaveText(expected);
    }

}