import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select[class="product_sort_container"]'
    private readonly priceLocators: string = 'div[class="inventory_item_price"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortBy(sortOption: string) {
        // Map human-readable sort names to actual dropdown values
        const sortMap: { [key: string]: string } = {
            'price (low to high)': 'lohi',
            'price (high to low)': 'hilo',
            'name (a to z)': 'az',
            'name (z to a)': 'za'
        };

        const optionValue = sortMap[sortOption.toLowerCase()] || sortOption;
        await this.page.locator(this.sortDropdown).selectOption(optionValue);
        // Wait for items to be sorted
        await this.page.waitForTimeout(500);
    }

    public async getAllPrices(): Promise<number[]> {
        const priceElements = await this.page.locator(this.priceLocators).allTextContents();
        return priceElements.map(price => {
            // Extract numeric value from price string (e.g., "$29.99" -> 29.99)
            const match = price.match(/\$?([\d.]+)/);
            return match ? parseFloat(match[1]) : 0;
        });
    }

    public async validatePricesSorted(sortType: string): Promise<boolean> {
        const prices = await this.getAllPrices();
        
        if (sortType.toLowerCase().includes('low to high') || sortType.toLowerCase().includes('asc')) {
            // Validate ascending order
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] > prices[i + 1]) {
                    return false;
                }
            }
        } else if (sortType.toLowerCase().includes('high to low') || sortType.toLowerCase().includes('desc')) {
            // Validate descending order
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] < prices[i + 1]) {
                    return false;
                }
            }
        }
        
        return true;
    }
}