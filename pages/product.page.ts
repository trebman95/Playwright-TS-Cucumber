import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartLink: string = '.shopping_cart_link'
    private readonly productSortDropdown: string = 'select[data-test="product-sort-container"]'
    private readonly itemPrice: string = 'div[data-test="inventory-item-price"]'
    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    async clickCartIcon() {
    await this.page.locator(this.cartLink).click();
  }

    async sortBy(sortType: string) {
    await this.page.waitForSelector(this.productSortDropdown, { timeout: 10000 });
    await this.page.selectOption(this.productSortDropdown, { label: sortType });
  }

    async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator(this.itemPrice).allInnerTexts();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }
}