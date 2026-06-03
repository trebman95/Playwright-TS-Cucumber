import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortContainer: string = '[data-test="product-sort-container"]';
    private readonly itemPrice: string = '[data-test="inventory-item-price"]';
    private readonly inventoryItem: string = '[data-test="inventory-item"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortBy(sortOption: string) {
        await this.page.locator(this.sortContainer).selectOption({ label: sortOption });
    }


    public async validatePriceSort(order: string) {
        const priceTexts = await this.page.locator(this.itemPrice).allTextContents();
        const prices = priceTexts.map(t => parseFloat(t.replace('$', '')));
        const expected = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a);
        if (JSON.stringify(prices) !== JSON.stringify(expected)) {
            throw new Error(`Prices not sorted ${order}: got ${prices}, expected ${expected}`);
        }
    }

    public async validateInventoryPage(expectedCount: number) {
        await this.page.waitForURL('**/inventory.html');
        await this.page.locator(this.inventoryItem).first().waitFor();
        const count = await this.page.locator(this.inventoryItem).count();
        if (count !== expectedCount) {
            throw new Error(`Expected ${expectedCount} products on the inventory page but found ${count}`);
        }
    }

}