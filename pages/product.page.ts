import { Page , expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown = '[data-test="product-sort-container"]';
    private readonly itemPrices = '.inventory_item_price';
    private readonly cartIcon = '.shopping_cart_link';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortProducts(sortType: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: sortType });
      }
    
      public async validateProductsSorted(sortType: string) {
        const prices = await this.page.$$eval(this.itemPrices, (els) =>
          els.map((el) => parseFloat(el.textContent!.replace("$", "")))
        );
    
        const sorted = [...prices].sort((a, b) =>
          sortType.includes("low to high") ? a - b : b - a
        );
    
        expect(prices).toEqual(sorted);
      }
    
      public async goToCart() {
        await this.page.locator(this.cartIcon).click();
      }
}