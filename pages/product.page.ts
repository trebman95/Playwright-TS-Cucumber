import { Page } from "@playwright/test"

const SELECTORS = {
    sortDropdown: '.product_sort_container',
    productPrice: '.inventory_item_price',
    // selector for the 'Sauce Labs Backpack'
    addToCartBackpack: 'button[id="add-to-cart-sauce-labs-backpack"]',
};

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'

    constructor(page: Page) {
        this.page = page;
    }

    async selectSortOption(sortText: string): Promise<void> {
        let optionValue: string;
        
        switch (sortText) {
            case 'Price (low to high)':
                optionValue = 'lohi';
                break;
            case 'Price (high to low)':
                optionValue = 'hilo';
                break;
            default:
                throw new Error(`Unsupported sort option: ${sortText}`);
        }
        
        await this.page.selectOption(SELECTORS.sortDropdown, { value: optionValue });
    }

    async getProductPrices(): Promise<number[]> {
        // Find all price elements
        const priceElements = await this.page.locator(SELECTORS.productPrice).allTextContents();
        
        const prices = priceElements.map(priceText => {
            const cleanText = priceText.replace('$', '');
            return parseFloat(cleanText);
        });
        
        return prices;
    }

    public async addBackPackToCart() {
        await this.page.locator(SELECTORS.addToCartBackpack).click();
    }
}