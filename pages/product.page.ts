import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly shoppingCartLink: string = '//*[@data-test="shopping-cart-link"]'
    private readonly checkoutButton: string = '//*[@data-test="checkout"]'
    private readonly dropDownButton: string = '//*[@data-test="product-sort-container"]'
    private readonly itemName: string = '//*[@data-test="inventory-item-name"]'
    private readonly itemPrice: string = '//*[@data-test="inventory-item-price"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async clickShoppingCart() {
        await this.page.locator(this.shoppingCartLink).click()
    }

    public async clickCheckout() {
        await this.page.locator(this.checkoutButton).click()
    }

    public async selectFilterOption(sortOption: string, expectedOrder: string) {
        if (sortOption == "Price" && expectedOrder == "descending") {
            await this.page.locator(this.dropDownButton).selectOption("hilo")
        } else if (sortOption == "Price" && expectedOrder == "ascending") {
            await this.page.locator(this.dropDownButton).selectOption("lohi")
        } else if (sortOption == "Name" && expectedOrder == "descending") {
            await this.page.locator(this.dropDownButton).selectOption("za")
        } else if (sortOption == "Name" && expectedOrder == "ascending") {
            await this.page.locator(this.dropDownButton).selectOption("az")
        }
    }

    public async validateItemOrder() {
        const sortOption = await this.page.locator(this.dropDownButton).inputValue()
        const actualNameOrder = await this.page.locator(this.itemName).allTextContents()
        const itemPriceList = await this.page.locator(this.itemPrice).allTextContents()
        if (sortOption == "az") {
            const expectedNameOrder = [...actualNameOrder].sort((a,b) => a.localeCompare(b))
            expect(actualNameOrder).toEqual(expectedNameOrder)
        } else if (sortOption == "za") {
            const expectedNameOrder = [...actualNameOrder].sort((a,b) => b.localeCompare(a))
            expect(actualNameOrder).toEqual(expectedNameOrder)
        } else if (sortOption == "lohi") {
            const itemPriceListTransFormed = itemPriceList.map(price => parseFloat(price.replace(/[$,]/g, "")))
            const expectedPriceOrder = [...itemPriceListTransFormed].sort((a,b) => a - b)
            expect(itemPriceListTransFormed).toEqual(expectedPriceOrder)
        } else if (sortOption == "hilo") {
            const itemPriceListTransFormed = itemPriceList.map(price => parseFloat(price.replace(/[$,]/g, "")))
            const expectedPriceOrder = [...itemPriceListTransFormed].sort((a,b) => b - a)
            expect(itemPriceListTransFormed).toEqual(expectedPriceOrder)
        }
    }

}