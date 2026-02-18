import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown = 'select[data-test="product-sort-container"]';
    private readonly itemPrices = '.inventory_item_price';


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
    public async sortItems(sortOption: string) {
    await this.page.selectOption(this.sortDropdown, { label: sortOption });
  }
  public async validateSortedByPrice(sortOption: string) {
    const prices = await this.page.$$eval(this.itemPrices, els =>
      els.map(el => parseFloat(el.textContent!.replace('$', '')))
    );

    const sortedPrices = [...prices].sort((a, b) =>
      sortOption.includes('low to high') ? a - b : b - a
    );

    expect(prices).toEqual(sortedPrices);
    expect(prices.length).toBe(6); // ensure 6 items
  }

}