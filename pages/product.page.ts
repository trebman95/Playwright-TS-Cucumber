import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly price: string = '[data-test="inventory-item-price"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
    
    public async sortItems(sort: string) {
        await this.page.getByRole('combobox').selectOption({label: sort});
    }

    public async checkSort(sort: string) {
        const prices = await this.page.locator(this.price).allTextContents()
        const pricesAsNumbers = prices.map(price => {
            return parseFloat(price.replace('$',''))
        })
        if (sort === "Price (low to high)") {
            const pricesSorted = [...pricesAsNumbers].sort((a, b) => a - b)
            expect(pricesAsNumbers).toEqual(pricesSorted);
        }
        else if (sort === "Price (high to low)") {
            const pricesSorted = [...pricesAsNumbers].sort((a, b) => a + b)
            expect(pricesAsNumbers).toEqual(pricesSorted);
        }
    }
}
