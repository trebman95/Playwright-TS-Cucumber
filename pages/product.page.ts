import { Page } from "@playwright/test"

export class Product {

    private readonly page: Page

    private readonly addToCart: string =
        'button[id="add-to-cart-sauce-labs-backpack"]'

    private readonly cart: string =
        '.shopping_cart_link'

    private readonly checkout: string =
        '#checkout'

    private readonly firstName: string =
        '#first-name'

    private readonly lastName: string =
        '#last-name'

    private readonly zipCode: string =
        '#postal-code'

    private readonly continueBtn: string =
        '#continue'

    private readonly finishBtn: string =
        '#finish'

    private readonly successText: string =
        '.complete-header'

    constructor(page: Page) {
        this.page = page
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async selectCart() {
        await this.page.locator(this.cart).click()
    }

    public async selectCheckout() {
        await this.page.locator(this.checkout).click()
    }

    public async fillCheckoutInformation() {
        const firstName = 'Siva'
        const lastName = 'Test'
        const zip = '12345'

        await this.page.locator(this.firstName).fill(firstName)
        await this.page.locator(this.lastName).fill(lastName)
        await this.page.locator(this.zipCode).fill(zip)
    }

    public async selectContinue() {
        await this.page.locator(this.continueBtn).click()
    }

    public async selectFinish() {
        await this.page.locator(this.finishBtn).click()
    }

    public async validateSuccessMessage(expected: string) {
        const actual = await this.page.locator(this.successText).textContent()

        if (actual !== expected) {
            throw new Error(`Expected ${expected} but found ${actual}`)
        }
    }

    public async sortProductsBy(sort: string) {
        await this.page
            .locator('.product_sort_container')
            .selectOption({ label: sort })
    }

    public async validateProductsSortedByPrice(sort: string) {
        const prices = await this.page
            .locator('.inventory_item_price')
            .allTextContents()

        const values = prices.map(price =>
            Number(price.replace('$', ''))
        )

        const expected = [...values]

        if (sort === 'Price (low to high)') {
            expected.sort((a, b) => a - b)
        } else {
            expected.sort((a, b) => b - a)
        }

        if (JSON.stringify(values) !== JSON.stringify(expected)) {
            throw new Error(`Products not sorted correctly for ${sort}`)
        }
    }
}