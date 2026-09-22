import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '.product_sort_container'
    private readonly productPrice: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortItems(sort: string) {
        if (sort === 'Price (low to high)') {
            await this.page.locator(this.sortDropdown).selectOption('lohi')
        } else if (sort === 'Price (high to low)') {
            await this.page.locator(this.sortDropdown).selectOption('hilo')
        }
    }

    public async validateProductSort(sort: string) {
        const priceText =
            await this.page.locator(this.productPrice).allTextContents()

        const actualPrices = priceText.map(price =>
            Number(price.replace('$', ''))
        )

        if (actualPrices.length !== 6) {
            throw new Error(
                `Expected 6 products but found ${actualPrices.length}`
            )
        }

        const expectedPrices = [...actualPrices]

        if (sort === 'Price (low to high)') {
            expectedPrices.sort((a, b) => a - b)
        } else if (sort === 'Price (high to low)') {
            expectedPrices.sort((a, b) => b - a)
        }

        for (let i = 0; i < actualPrices.length; i++) {
            if (actualPrices[i] !== expectedPrices[i]) {
                throw new Error(
                    'Products are not sorted correctly by price'
                )
            }
        }
    }
}

