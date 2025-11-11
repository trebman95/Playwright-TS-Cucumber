import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly shoppingCart: string = '#shopping_cart_container'
    private readonly sortDropdown: string = '[data-test="product-sort-container"]'
    private readonly productPrices: string = '[data-test="inventory-item-price"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async clickShoppingCart() {
        await this.page.locator(this.shoppingCart).click()
    }

    public async sortBy(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption(sortOption);
    }

    public async getProductPrices(): Promise<number[]> {
        const priceElements = await this.page.locator(this.productPrices).all();
        const prices: number[] = [];
        
        for (const element of priceElements) {
            const priceText = await element.textContent();
            const price = parseFloat(priceText?.replace('$', '') || '0');
            prices.push(price);
        }
        
        return prices;
    }

    public async validatePricesSortedHighToLow() {
        const prices = await this.getProductPrices();
        
        for (let i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                throw new Error(`Prices not sorted high to low. Found ${prices[i]} after ${prices[i - 1]}`);
            }
        }
    }

    public async validatePricesSortedLowToHigh() {
        const prices = await this.getProductPrices();
        
        for (let i = 1; i < prices.length; i++) {
            if (prices[i] < prices[i - 1]) {
                throw new Error(`Prices not sorted low to high. Found ${prices[i]} after ${prices[i - 1]}`);
            }
        }
    }
}