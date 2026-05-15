import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortSelect: string = '[data-test="product_sort_container"]'
    private readonly sortDropdown: string = '.product_sort_container'
    private readonly priceLocator: string = '.inventory_item_price'
    private readonly priceSelectors: string = 'div.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.addToCart).click();
    }

    public async sortBy(sortOption: string) {
        await this.page.locator(this.sortDropdown).waitFor({ state: 'visible', timeout: 10000 });
        let value: string;
        if (sortOption === 'Price (low to high)') {
            value = 'lohi';
        } else if (sortOption === 'Price (high to low)') {
            value = 'hilo';
        } else {
            throw new Error(`Unknown sort option: ${sortOption}`);
        }
        await this.page.locator(this.sortDropdown).selectOption(value);
    }

    public async validatePriceSort(sortOption: string) {
        await this.page.waitForLoadState('networkidle');
        const selectedValue = await this.page.locator(this.sortDropdown).inputValue();
        const isLowToHigh = sortOption === 'Price (low to high)';
        const isHighToLow = sortOption === 'Price (high to low)';

        await this.page.locator(this.priceSelectors).first().waitFor({ state: 'visible', timeout: 10000 });
        const priceElements = await this.page.locator(this.priceSelectors).all();
        const prices: number[] = [];
        for (const element of priceElements) {
            const text = await element.innerText();
            const price = parseFloat(text.replace('$', ''));
            prices.push(price);
        }

        const sortedPrices = [...prices].sort((a, b) => a - b);
        if (isHighToLow) {
            sortedPrices.reverse();
        }

        if (!prices.every((price, index) => price === sortedPrices[index])) {
            throw new Error(`Prices are not sorted according to "${sortOption}"`);
        }
    } 

    /*public async sortProductsBy(sortOption: string) {
        const sortLocator = this.page.locator(this.sortSelect);
        await sortLocator.waitFor({ state: 'visible', timeout: 35000 });
        await sortLocator.selectOption({ label: sortOption });
    }

    /*private async getProductPrices(): Promise<number[]> {
        const priceElements = this.page.locator(this.priceLocator);
        const count = await priceElements.count();
        const prices: number[] = [];

        for (let index = 0; index < count; index++) {
            const text = await priceElements.nth(index).textContent();
            const numeric = text ? parseFloat(text.replace('$', '').trim()) : NaN;
            prices.push(numeric);
        }

        return prices;
    }

    /*public async validateProductsSortedByPrice(sortOption: string) {
        const prices = await this.getProductPrices();
        if (prices.length !== 6) {
            throw new Error(`Expected 6 product prices but found ${prices.length}`);
        }

        const sortedPrices = [...prices].sort((a, b) => a - b);
        if (sortOption === 'Price (high to low)') {
            sortedPrices.reverse();
        }

        for (let i = 0; i < prices.length; i++) {
            if (prices[i] !== sortedPrices[i]) {
                throw new Error(`Expected prices sorted as ${sortedPrices.join(', ')} but got ${prices.join(', ')}`);
            }
        }
    }*/
}