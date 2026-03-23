import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id*="sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select[data-test="product-sort-container"]'
    private readonly priceSelectors: string = 'div.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortBy(sortOption: string) {
        await this.page.waitForSelector(this.sortDropdown);
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

    public async validatePriceSort() {
        const selectedValue = await this.page.locator(this.sortDropdown).inputValue();
        const isLowToHigh = selectedValue === 'lohi';
        const isHighToLow = selectedValue === 'hilo';

        const priceElements = await this.page.locator(this.priceSelectors).all();
        const prices: number[] = [];
        for (const element of priceElements) {
            const text = await element.innerText();
            const price = parseFloat(text.replace('$', ''));
            prices.push(price);
        }

      

        const sortedPrices = [...prices].sort((a, b) => a - b);
        if (isLowToHigh) {
            if (!prices.every((price, index) => price === sortedPrices[index])) {
                throw new Error('Prices are not sorted low to high');
            }
        } else if (isHighToLow) {
            sortedPrices.reverse();
            if (!prices.every((price, index) => price === sortedPrices[index])) {
                throw new Error('Prices are not sorted high to low');
            }
        } 
    }
}
