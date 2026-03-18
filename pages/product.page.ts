import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-test="product-sort-container"]'
    private readonly priceLabels:string = '.inventory_item_price'
    private readonly inventoryItemName: string = '.inventory_item_name'


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortBy(option: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: option })
    }

    private async validatePriceSorting(option: string) {
        const prices = await this.page.locator(this.priceLabels).allTextContents();
        const numPrices = prices.map(p => Number(p.replace('$', '')));

        const sortedPrices = [...numPrices].sort((a, b) =>
            option.includes('low to high') ? a - b : b - a
        );

    expect(numPrices).toEqual(sortedPrices);
    }

    private async validateNameSorting(option: string) {
        const names = await this.page.locator(this.inventoryItemName).allTextContents();
        const sortedNames = [...names].sort((a, b) =>
            option.includes("A to Z")
                ? a.localeCompare(b)
                : b.localeCompare(a)
            );

        expect(names).toEqual(sortedNames);
    }
  
    public async validateSorting(option: string) {
    if (option.includes("low to high") || option.includes("high to low")) {
        await this.validatePriceSorting(option);
    } else {
        await this.validateNameSorting(option);
    }
    
}

}