import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartLink = '.shopping_cart_link';
    private readonly checkoutButton = '#checkout';

    private readonly firstNameField = '#first-name';
    private readonly lastNameField = '#last-name';
    private readonly postalCodeField = '#postal-code';
    private readonly continueButton = '#continue';

    private readonly finishButton = '#finish';
    private readonly completeHeader = '[data-test="complete-header"]';

    private readonly sortDropdown = '[data-test="product-sort-container"]';
    private readonly productPrices = '.inventory_item_price';

    private readonly cartBadge = '.shopping_cart_badge';

    private readonly removeFromCart = '#remove-sauce-labs-backpack';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async openCart() {
        await this.page.locator(this.cartLink).click();
    }

    public async clickCheckout(){
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillPersonalInfo(
        firstName: string, 
        lastName: string, 
        zipCode: string) {

        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.postalCodeField).fill(zipCode);

    }
    public async clickContinue(){
        await this.page.locator(this.continueButton).click();
    }

    public async clickFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async validatePurchaseConfirmationText(expectedText: string) {
        await expect(this.page.locator(this.completeHeader)).toBeVisible();
        await expect(this.page.locator(this.completeHeader)).toHaveText(expectedText);
    }

    public async sortProductsBy(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: sortOption });
    }

    public async validatePricesSorted(order: string) {
        const priceTexts = await this.page.locator(this.productPrices).allTextContents();

        const actualPrices = priceTexts.map((text) =>
            Number(text.replace('$', '').trim())
        );

        expect(actualPrices).toHaveLength(6);

        const expectedPrices = [...actualPrices].sort((a, b) =>
            order.toLowerCase() === 'desc' ? b - a : a - b
        );

        expect(actualPrices).toEqual(expectedPrices);
    }

    public async validateCartBadgeCount(expectedCount: string) {
        await expect(this.page.locator(this.cartBadge)).toBeVisible();
        await expect(this.page.locator(this.cartBadge)).toHaveText(expectedCount);
    }

    public async removeBackPackFromCart() {
        await this.page.locator(this.removeFromCart).click();
    }
    
    public async validateCartBadgeNotVisible() {
        await expect(this.page.locator(this.cartBadge)).toHaveCount(0);
    }
}
