import { DataTable } from "@cucumber/cucumber"
import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartLocator: string = 'a[class="shopping_cart_link"]'
    private readonly cartItemLocator: string = 'div[class="inventory_item_name"]'
    private readonly checkoutButtonLocator: string = 'button[id="checkout"]'
    private readonly sortOptionLocator: string = 'span[class="select_container"]'
    private readonly sortTypeLocator: string = 'select[data-test="product_sort_container"]'
    private readonly priceDisplayed: string = 'div[class="inventory_item_price"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async selectSortOption(label: string) {
        const sortDropdown = this.page.locator(this.sortTypeLocator);
        if(label === 'Price (low to high)') {
            await sortDropdown.selectOption('lohi');
            return;
        }else if(label === 'Price (high to low)') {
            await sortDropdown.selectOption('hilo');
            return;
        }
    }

    public async clickCart() {
        await this.page.locator(this.cartLocator).click()
    }

    public async clickSortOptionLocator() {
        this.page.waitForTimeout(1000);
        await this.page.locator(this.sortOptionLocator).click()
    }

    public async verifyPiceSort(dataTable: DataTable) {
        const getDisplayedActual = await this.page.locator(this.priceDisplayed).allTextContents();
        console.log('Displayed Prices:', getDisplayedActual);
        const expectedPrices = dataTable.rows()[0];
        const actualNumbers = getDisplayedActual.map(a => parseFloat(a.replace('$', '')));
        console.log('Actual Prices:', actualNumbers);
        const expectedNumbers = expectedPrices.map(b => parseFloat(b.replace('$', '')));
        console.log('Expected Prices:', expectedNumbers);
        expect(actualNumbers).toEqual(expectedNumbers);
    }

    public async verifyBackupVisibleInCart() {
        const backpackInCart = this.page.locator(this.cartItemLocator, { hasText: 'Sauce Labs Backpack' });
        if (!(await backpackInCart.isVisible())) {
            throw new Error('Backpack is not visible in the cart');
        }
    }

    public async clickCheckoutButton() {
        await this.page.locator(this.checkoutButtonLocator).click()
    }
}