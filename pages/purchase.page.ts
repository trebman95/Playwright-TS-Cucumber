import { Page, expect } from "@playwright/test"

export let price: number;

export class Purchase {
    private readonly page: Page
    private readonly cartBtn: string = 'a.shopping_cart_link'
    private readonly checkoutBtn: string = '[data-test="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueBtn: string = '[data-test="continue"]'
    private readonly finishBtn: string = '[data-test="finish"]'
    private readonly completeHeader: string = '[data-test="complete-header"]'
    private readonly inventoryItemPrice: string = '[data-test="inventory-item-price"]'

    constructor(page: Page) {
        this.page = page;
    }
    public async selectCartAndCheckout() {
        await this.page.locator(this.cartBtn).click();
        await this.page.locator(this.checkoutBtn).click();
    }

    public async fillInShippingInformationAndClickContinue() {
        await this.page.locator(this.firstNameField).fill('John');
        await this.page.locator(this.lastNameField).fill('Doe');
        await this.page.locator(this.postalCodeField).fill('12345');
        await this.page.locator(this.continueBtn).click();
    }

    public async selectFinish() {
        await this.page.locator(this.finishBtn).click();
    }

    public async validateCompleteText(expectedText: string) {
        const actualText = await this.page.locator(this.completeHeader).textContent();
        expect(actualText).toEqual(expectedText);
    }

    public async getPriceAndClickCheckout() {
        const priceText = await this.page.locator(this.inventoryItemPrice).first().textContent();
        if (!priceText) {
            throw new Error('Could not find price text');
        }
        price = parseFloat(priceText.replace('$', ''));
        if (Number.isNaN(price)) {
            throw new Error(`Could not parse price from "${priceText}"`);
        }
        await this.selectCartAndCheckout();
    }

    public async validatePriceInCheckout() {
        const checkoutPriceText = await this.page.locator(this.inventoryItemPrice).first().textContent();
        if (!checkoutPriceText) {
            throw new Error('Could not find price text in checkout');
        }
        const checkoutPrice = parseFloat(checkoutPriceText.replace('$', ''));
        if (Number.isNaN(checkoutPrice)) {
            throw new Error(`Could not parse price from "${checkoutPriceText}"`);
        }
        expect(checkoutPrice).toEqual(price);
    }
}
