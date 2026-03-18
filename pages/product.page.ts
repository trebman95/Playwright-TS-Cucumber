import { expect, Page } from "@playwright/test"
import exp from "constants"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartButton: string = 'a.shopping_cart_link'
    private readonly sortDropdown: string = 'select.product_sort_container'
    private readonly itemPrices: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }

    public async clickOnCart() {
        await this.page.locator(this.cartButton).click();
    }

    public async sortItemsByPrice(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption(sortOption);
    }

    public async validateItemsAreSortedByPrice(sortOption: string) {
        const itemPrices = await this.page.locator(this.itemPrices).allTextContents();
        const priceValues = itemPrices.map(itemPrices => parseFloat(itemPrices.replace('$', '')));
        const sortedPrices = [...priceValues].sort((a, b) => a - b);
        if (sortOption === 'Price (low to high)') {
            expect(priceValues).toEqual(sortedPrices);
            await this.page.screenshot({path: './screenshots/Price (low to high).jpg', fullPage: true});
        }
        else if (sortOption === 'Price (high to low)') {
            expect(priceValues).toEqual([...sortedPrices].reverse());
            await this.page.screenshot({path: './screenshots/Price (high to low).jpg', fullPage: true});
        }
    }
}