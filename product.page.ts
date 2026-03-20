import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
     
public async sortItems(sortType: string) {
  await this.page.selectOption(".product_sort_container", sortType);
}
 public async waitForSelector(selector: string) {
  await this.page.waitForSelector(selector);
  
}