import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartLink: string = '.shopping_cart_link'
    private readonly cartBadge: string = '.shopping_cart_badge'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly orderConfirmation: string = '[data-test="complete-header"]'
    private readonly sortSelect: string = '[data-test="product-sort-container"]'
    private readonly productPrice: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async openCart() {
        await this.page.locator(this.cartLink).click()
    }

    public async checkout() {
        await this.page.locator(this.checkoutButton).click()
    }

    public async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName)
        await this.page.locator(this.lastNameField).fill(lastName)
        await this.page.locator(this.postalCodeField).fill(postalCode)
    }

    public async continueCheckout() {
        await this.page.locator(this.continueButton).click()
    }

    public async finishCheckout() {
        await this.page.locator(this.finishButton).click()
    }

    public async validateOrderConfirmation(expectedText: string) {
        const actualText = await this.page.locator(this.orderConfirmation).textContent()
        if (actualText?.trim() !== expectedText) {
            throw new Error(`Expected order confirmation to be "${expectedText}" but found "${actualText?.trim() ?? ''}"`)
        }
    }

    public async sortBy(sortLabel: string) {
        const sortValues: Record<string, string> = {
            'Price (low to high)': 'lohi',
            'Price (high to low)': 'hilo',
        }
        const sortValue = sortValues[sortLabel]
        if (!sortValue) {
            throw new Error(`Unsupported product sort option: ${sortLabel}`)
        }
        await this.page.locator(this.sortSelect).selectOption(sortValue)
    }

    public async validatePricesAreSorted(direction: string, expectedCount: number) {
        const prices = await this.page.locator(this.productPrice).allTextContents()
        const numericPrices = prices.map((price) => Number.parseFloat(price.replace('$', '')))

        if (numericPrices.length !== expectedCount) {
            throw new Error(`Expected ${expectedCount} product prices but found ${numericPrices.length}`)
        }

        const isAscending = direction === 'ascending'
        const isDescending = direction === 'descending'
        if (!isAscending && !isDescending) {
            throw new Error(`Unsupported sort direction: ${direction}`)
        }

        for (let index = 1; index < numericPrices.length; index += 1) {
            const previous = numericPrices[index - 1]
            const current = numericPrices[index]
            const isCorrectOrder = isAscending ? previous <= current : previous >= current
            if (!isCorrectOrder) {
                throw new Error(`Expected prices to be sorted ${direction}, but found ${numericPrices.join(', ')}`)
            }
        }
    }

    public async validateCartItemCount(expectedCount: number) {
        const actualCount = Number.parseInt((await this.page.locator(this.cartBadge).textContent())?.trim() ?? '0', 10)
        if (actualCount !== expectedCount) {
            throw new Error(`Expected cart item count to be ${expectedCount} but found ${actualCount}`)
        }
    }
}
