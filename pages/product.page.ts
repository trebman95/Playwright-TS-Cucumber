import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortItemsBy(sortOption: string) {
        await this.page.locator('select[data-test="product-sort-container"]').selectOption({ value: sortOption });
    }

    public async ValidateItemsSortedByPrice(sortOption: string) {
        
        const priceElements = await this.page.locator('div[data-test="inventory-item-price"]').all();

        // Extract prices
        const prices: number[] = [];
        for (const element of priceElements) {
        const priceText = await element.textContent();
        const price = parseFloat(priceText?.replace('$', '') || '0');
        prices.push(price);
        }


        if (prices.length !== 6) {
        throw new Error(`Expected 6 items but found ${prices.length}`);
        }

        const sortedPrices = [...prices];
        if (sortOption === 'lohi') {
        sortedPrices.sort((a, b) => a - b); // Low to High
        } else if (sortOption === 'hilo') {
        sortedPrices.sort((a, b) => b - a); // High to Low
        }

        const isCorrectlySorted = prices.every((price, index) => price === sortedPrices[index]);

        if (!isCorrectlySorted) {
        throw new Error(`Items are not sorted correctly by price (${sortOption}). Expected: [${sortedPrices}], but got: [${prices}]`);
        }
    }

    public async ValidateItemsSortedByName(sortOption: string) {
        
        const nameElements = await this.page.locator('div[data-test="inventory-item-name"]').all();

        // Extract names
        const names: string[] = [];
        for (const element of nameElements) {
        const nameText = await element.textContent();
        names.push(nameText?.trim() || '');
        }


        if (names.length !== 6) {
        throw new Error(`Expected 6 items but found ${names.length}`);
        }

        const sortedNames = [...names];
        if (sortOption === 'az') {
        sortedNames.sort(); // A to Z
        } else if (sortOption === 'za') {
        sortedNames.sort().reverse(); // Z to A
        }

        const isCorrectlySorted = names.every((name, index) => name === sortedNames[index]);

        if (!isCorrectlySorted) {
        throw new Error(`Items are not sorted correctly by name (${sortOption}). Expected: [${sortedNames}], but got: [${names}]`);
        }
    }
}   