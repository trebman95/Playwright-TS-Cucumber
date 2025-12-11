import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cart: string = '[class="shopping_cart_link"]'
    private readonly checkout: string = 'button[id="checkout"]'
    private readonly first: string = 'input[id="first-name"]'
    private readonly last: string = 'input[id="last-name"]'
    private readonly zip: string = 'input[id="postal-code"]'
    private readonly continue: string = 'input[type="submit"]'
    private readonly finish: string = 'button[id="finish"]'
    private readonly tyMessage: string = '[data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async selectCart() {
        await this.page.locator(this.cart).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkout).click();
    }

    public async fillNames(firstName: string, lastName: string) {
        await this.page.locator(this.first).fill(firstName);
        await this.page.locator(this.last).fill(lastName);
    }

    public async fillZip(zipCode: string) {
        await this.page.locator(this.zip).fill(zipCode);
    }

    public async selectContinue() {
        await this.page.locator(this.continue).click();
    }

    public async selectFinish() {
        await this.page.locator(this.finish).click();
    }

    public async validateThankYou(thankYou: string) {
        const thankYouMessage = await this.page.locator(this.tyMessage).innerText();
        if (thankYou !== thankYouMessage) {
            throw new Error(`Expected message ${thankYou} but was ${thankYouMessage}`);
        }
    }
}