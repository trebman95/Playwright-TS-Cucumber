import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-test="product-sort-container"]'
    private readonly priceLabels: string = '.inventory_item_price'
    private readonly productsTitle: string = '[data-test="title"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortProducts(sortOption: string) {
        const dropdown = this.page.locator(this.sortDropdown);
        await dropdown.selectOption({ label: sortOption });
    }

    public async validatePriceSort(sortOption: string) {
        const priceTexts = await this.page.locator(this.priceLabels).allTextContents();

        if (priceTexts.length !== 6) {
            throw new Error(`Expected to find 6 product prices but found ${priceTexts.length}`);
        }

        const prices = priceTexts.map((priceText) => {
            const cleaned = priceText.replace('$', '').trim();
            const value = Number.parseFloat(cleaned);

            if (Number.isNaN(value)) {
                throw new Error(`Unable to parse price value from "${priceText}"`);
            }

            return value;
        });

        const sortedPrices = [...prices].sort((a, b) => {
            if (sortOption.toLowerCase().includes('low to high')) {
                return a - b;
            }

            if (sortOption.toLowerCase().includes('high to low')) {
                return b - a;
            }

            throw new Error(`Unsupported sort option "${sortOption}"`);
        });

        const isSorted = prices.every((price, index) => price === sortedPrices[index]);

        if (!isSorted) {
            throw new Error(`Prices are not sorted ${sortOption}`);
        }
    }

    public async validateProductsPageTitle(expectedTitle: string) {
        const titleLocator = this.page.locator(this.productsTitle);
        await titleLocator.waitFor({ state: 'visible' });
        const actualTitle = (await titleLocator.textContent())?.trim();

        if (actualTitle !== expectedTitle) {
            throw new Error(`Expected products page title to be "${expectedTitle}" but found "${actualTitle}"`);
        }
    }
}
