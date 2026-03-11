import {expect, Page} from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly productTitle: string = 'span[data-test="title"]'
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly shoppingCart: string = 'a[data-test="shopping-cart-link"]'
    private readonly productSort: string = 'select[data-test="product-sort-container"]'
    private readonly products: string = 'div[data-test="inventory-item-price"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(): Promise<void> {
        await expect(this.page.locator(this.productTitle)).toBeVisible();
    }
    public async addBackPackToCart(): Promise<void> {
        await this.page.locator(this.addToCart).click()
    }

    public async selectCart(): Promise<void> {
        await this.page.locator(this.shoppingCart).click();
    }

    public async selectDropdown(sortOrder: string): Promise<void> {
        await this.page.locator(this.productSort).selectOption(sortOrder);
    }

    public async sortItems(prices: string): Promise<void> {
        const priceElements :string[] = await this.page.locator(this.products).allTextContents();
        const actualPrices: number[] = priceElements.map((p: string) :number => parseFloat(p.replace('$', '')));
        const expectedPrices: number[] = prices.split(',').map(Number);

        expect(actualPrices.length).toBe(6);
        expectedPrices.forEach((expectedPrice: number, index: number): void => {
            expect(actualPrices[index]).toBe(expectedPrice);
        });
    }
}