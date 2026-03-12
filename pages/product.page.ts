import { expect, Page } from '@playwright/test';

export class Product {
    private readonly page: Page;
    private readonly addToCart = '[data-test="add-to-cart-sauce-labs-backpack"]';
    private readonly sortDropdown = '[data-test="product-sort-container"]';
    private readonly inventoryPrices = '[data-test="inventory-item-price"]';
    private readonly cartBadge = '[data-test="shopping-cart-badge"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    public async sortProductsBy(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: sortOption });
    }

    public async validateProductsSortedByPrice(direction: string) {
        const priceTexts = await this.page.locator(this.inventoryPrices).allTextContents();
        const prices = priceTexts.map((price) => Number(price.replace('$', '').trim()));
        const expectedPrices = [...prices].sort((first, second) =>
          direction === 'ascending' ? first - second : second - first
        );

        expect(prices).toEqual(expectedPrices);
    }

    public async validateCartBadgeCount(expectedCount: string) {
        await expect(this.page.locator(this.cartBadge)).toHaveText(expectedCount);
    }
}
