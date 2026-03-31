import { Page } from "@playwright/test"
import { expect } from '@playwright/test';

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartTopRight: string = 'div[id="shopping_cart_container"]'
    private readonly checkout: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[name="lastName"]'
    private readonly zipPostalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly thankYouMessage: string = 'h2[class="complete-header"]'
    private readonly sortDropDown: string = 'select[class="product_sort_container"]'
    private readonly priceLocator: string = 'div[class="inventory_item_price"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
    public async selectCart() {
        await this.page.locator(this.cartTopRight).click()
    }
     public async selectCheckout() {
        await this.page.locator(this.checkout).click()
    }
    public async fillInfo(firstName:string, lastName:string, zipCode:string) {
        await this.page.locator(this.firstNameField).fill(firstName)
        await this.page.locator(this.lastNameField).fill(lastName)
        await this.page.locator(this.zipPostalCodeField).fill(zipCode)
    }
     public async selectContinue() {
        await this.page.locator(this.continueButton).click()
    }
     public async selectFinish() {
        await this.page.locator(this.finishButton).click()
    }
      public async confirmMessage(expectedThankYouMessage: string) {
        const thankYou = this.page.locator(this.thankYouMessage)
        await expect(thankYou).toBeVisible();
        await expect(thankYou).toContainText(expectedThankYouMessage);

    }
    public async selectSortDropDown(sortOption: string) {
        await this.page.locator(this.sortDropDown).selectOption({ label: sortOption });
        await this.page.waitForTimeout(500); // allow UI to update
    }

    //Return all product prices as numbers
    public async getAllPrices(): Promise<number[]> {
        const priceElements = await this.page.locator(this.priceLocator).allTextContents();
        return priceElements.map(price => parseFloat(price.replace('$', '')));
    }
 



}