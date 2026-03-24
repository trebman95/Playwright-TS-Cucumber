import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartButton: string = 'a[data-test="shopping-cart-link"]'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly successMessage: string = 'h2[data-test="complete-header"]'

    private readonly cartIcon: string = '[data-test="shopping-cart-badge"]'

    private readonly dropdownSort: string = 'select[data-test="product-sort-container"]'
    private readonly itemPrices: string = '[data-test="inventory-item-price"]'

    private readonly firstNameValue: string = 'John'
    private readonly lastNameValue: string = 'Smith'
    private readonly postalCodeValue: string = '121212'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    public async validateCartIcon(expectedCount: string) {
        await expect(this.page.locator(this.cartIcon)).toHaveText(expectedCount);
    }


    public async goToCart() {
        await this.page.locator(this.cartButton).click();
    }

    public async proceedToCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillCheckoutInformation() {
        await this.page.locator(this.firstNameField).fill(this.firstNameValue)
        await this.page.locator(this.lastNameField).fill(this.lastNameValue)
        await this.page.locator(this.postalCodeField).fill(this.postalCodeValue);
    }

    public async continueToCheckout() {
        await this.page.locator(this.continueButton).click();
    }

    public async finishThePurchase() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateSuccessMessage(expectedMessage: string) {
        await expect(this.page.locator(this.successMessage)).toHaveText(expectedMessage);
            
    }

    public async sortItemsByPrice(sortOption: string) {
        await this.page.locator(this.dropdownSort).selectOption({ label: sortOption });
    }

    public async validateItemsSortedByPrice(sortOption: string) {
        const priceValue = await this.page.locator(this.itemPrices).allTextContents();

        const prices = priceValue.map(p => Number(p.replace('$', '').trim()));

        const sortedPrices = [...prices].sort((a, b) => a - b);

        if (sortOption === 'Price (low to high)') {
            expect(prices).toEqual(sortedPrices);
        } else if (sortOption === 'Price (high to low)') {
            expect(prices).toEqual([...sortedPrices].reverse());
        } else {
            throw new Error(`Unsupported sorting option: ${sortOption}`);
        }
    }
}