import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-test="product_sort_container"]';
    private readonly productPrices: string = '.inventory_item_price';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortProducts(option: string) {
        await this.page.waitForSelector('.product_sort_container', { state: 'visible' });
        await this.page.selectOption('.product_sort_container', { label: option });
        await this.page.waitForTimeout(3000);
    }

    public async getAllProductPrices(): Promise<number[]> {
        await this.page.waitForSelector(this.productPrices, { timeout: 10000 });
        const priceTexts = await this.page.locator(this.productPrices).allTextContents();
        return priceTexts.map(p => parseFloat(p.replace('$', '').trim()));
    }
}