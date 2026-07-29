import { Page } from "@playwright/test";

export class Product {
    private readonly page: Page;

    private readonly addToCart: string =
        'button[id="add-to-cart-sauce-labs-backpack"]';

    private readonly cart: string =
        '[data-test="shopping-cart-link"]';

    private readonly checkoutButton: string =
        '[data-test="checkout"]';

    private readonly firstNameField: string =
        '[data-test="firstName"]';

    private readonly lastNameField: string =
        '[data-test="lastName"]';

    private readonly postalCodeField: string =
        '[data-test="postalCode"]';

    private readonly continueButton: string =
        '[data-test="continue"]';

    private readonly finishButton: string =
        '[data-test="finish"]';

    private readonly purchaseConfirmation: string =
        '[data-test="complete-header"]';

    private readonly sortDropdown: string =
    '[data-test="product-sort-container"]';

    private readonly productPrices: string =
    '[data-test="inventory-item-price"]';    

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    public async selectCart() {
        await this.page.locator(this.cart).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async enterCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.postalCodeField).fill(postalCode);
    }

    public async selectContinue() {
        await this.page.locator(this.continueButton).click();
    }

    public async selectFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async validatePurchaseConfirmation(expectedMessage: string) {
        const actualMessage = await this.page
            .locator(this.purchaseConfirmation)
            .textContent();

        if (actualMessage?.trim() !== expectedMessage) {
            throw new Error(
                `Expected purchase confirmation to be "${expectedMessage}" but found "${actualMessage?.trim()}"`
            );
        }
    }
    public async sortProducts(sortOption: string) {
    if (sortOption === 'Price (low to high)') {
        await this.page.locator(this.sortDropdown).selectOption('lohi');
    } else if (sortOption === 'Price (high to low)') {
        await this.page.locator(this.sortDropdown).selectOption('hilo');
    } else {
        throw new Error(`Unsupported sort option: ${sortOption}`);
    }
}

    public async validateProductPricesSorted(order: string) {
     const priceTexts = await this.page
        .locator(this.productPrices)
        .allTextContents();

     const actualPrices = priceTexts.map((price) =>
        Number(price.replace('$', '').trim())
    );

    const expectedPrices = [...actualPrices];

    if (order === 'ascending') {
        expectedPrices.sort((a, b) => a - b);
    } else if (order === 'descending') {
        expectedPrices.sort((a, b) => b - a);
    } else {
        throw new Error(`Unsupported sort order: ${order}`);
    }

    if (JSON.stringify(actualPrices) !== JSON.stringify(expectedPrices)) {
        throw new Error(
            `Prices are not sorted ${order}.
    Actual: ${actualPrices.join(', ')}
    Expected: ${expectedPrices.join(', ')}`
        );
    }
}
}