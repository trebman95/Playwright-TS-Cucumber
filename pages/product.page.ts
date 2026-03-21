import { Page, expect } from "@playwright/test"
import { getRandomFirstName, getRandomLastName, getRandomZipCode } from "../playwrightUtilities"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-test="product-sort-container"]'
    private readonly itemPrices: string = '[data-test="inventory-item-price"]'
    private readonly cart: string = 'a[data-test="shopping-cart-link"]'
    private readonly checkout: string = 'button[data-test="checkout"]'
    private readonly firstName: string = 'input[data-test="firstName"]'
    private readonly lastName: string = 'input[data-test="lastName"]'
    private readonly zipCode: string = 'input[data-test="postalCode"]'
    private readonly continue: string = 'input[data-test="continue"]'
    private readonly finish: string = 'button[data-test="finish"]'
    private readonly thankyouMessage: string = 'h2[data-test="complete-header"]'
    private readonly cartBadge: string = '[data-test="shopping-cart-badge"]'



    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async selectCart() {
        await this.page.locator(this.cart).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkout).click();
    }

    public async fillInTheDetails() {
        await this.page.waitForSelector(this.firstName);
        await this.page.locator(this.firstName).fill(getRandomFirstName());
        await this.page.locator(this.lastName).fill(getRandomLastName());
        await this.page.locator(this.zipCode).fill(getRandomZipCode());

    }
    public async sortItemsByPrice(sort: string) {
        await this.page.locator(this.sortDropdown).selectOption(sort);
    }
    public async selectContinue() {
        await this.page.locator(this.continue).click();

    }
    public async selectFinish() {
        await this.page.locator(this.finish).click();

    }
    public async validateFinalMessage(ThankyouMsg: string) {
        const finalMsg = await this.page.locator(this.thankyouMessage);
        await expect(finalMsg).toBeVisible();
        await expect(finalMsg).toContainText(ThankyouMsg);

    }
    public async validateProductsAreSortedByPrice(sort: string) {
        const priceTexts = await this.page.locator(this.itemPrices).allTextContents();
        const actualPrices = priceTexts.map(price => Number(price.replace('$', '').trim()));
        await expect(actualPrices.length).toBe(6);
        const expectedPrices = [...actualPrices].sort((a, b) =>
            sort === 'hilo' ? b - a : a - b
        );

        await expect(actualPrices).toEqual(expectedPrices);

    }

    public async validateCartBadgeCount(expectedCount: string) {
        const cartBadge = this.page.locator(this.cartBadge);
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText(expectedCount);
    }


}