import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartLink: string = 'a.shopping_cart_link'
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalField: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly completeHeader: string = '.complete-header'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackpackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async openCart() {
        await this.page.locator(this.cartLink).click()
    }

    public async checkout() {
        await this.page.locator(this.checkoutButton).click()
    }

    public async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName)
        await this.page.locator(this.lastNameField).fill(lastName)
        await this.page.locator(this.postalField).fill(postalCode)
    }

    public async continueCheckout() {
        await this.page.locator(this.continueButton).click()
    }

    public async finishCheckout() {
        await this.page.locator(this.finishButton).click()
    }

    public async getConfirmationHeader(): Promise<string> {
        const t = await this.page.locator(this.completeHeader).textContent()
        return t ? t.trim() : ''
    }

    public async validateConfirmation(expected: string) {
        const actual = await this.getConfirmationHeader()
        if (!actual.toLowerCase().includes(expected.toLowerCase())) {
            throw new Error(`Expected confirmation to include "${expected}" but found "${actual}"`)
        }
    }
}
