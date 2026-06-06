import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropDown: string = 'select [class="product_sort_container"]'
    private readonly hilo: string = 'option[value="hilo"]'
    private readonly lohi: string = 'option[value="lohi"]'
    private readonly inventoryList: string = 'div[class="inventory_list"]'


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortHighToLow(){
        await this.page.locator(this.sortDropDown).click()
        await this.page.locator(this.hilo).click()
    }

    public async sortLowToHigh(){
        await this.page.locator(this.sortDropDown).click()
        await this.page.locator(this.lohi).click()
    }

    public async getListedPrices():Promise<number[]>
    {
        let itemList = await this.page.locator(this.inventoryList).allTextContents()

        throw new Error(`recieved ${itemList}`)



    }







}