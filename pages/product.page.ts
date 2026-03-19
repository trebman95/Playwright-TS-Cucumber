import { expect, Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly firstName: string = 'Testy'
    private readonly lastName: string = 'McTester'
    private readonly zipcode: string = '12345'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly zipcodeField: string = 'input[id="postal-code"]'
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartLink: string = '[data-test="shopping-cart-link"]'
    private readonly cartCheckoutButton: string = 'button[id="checkout"]'
    private readonly checkoutContinueButton: string = 'input[id="continue"]'
    private readonly finishCheckoutButton: string = 'button[id="finish"]'
    private readonly orderCompleteText: string = '[data-test="complete-header"]'
    


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async selectCart(){
        await this.page.locator(this.cartLink).click()
    }

    public async selectCheckout(){
        await this.page.locator(this.cartCheckoutButton).click()
    }

     public async completeCheckoutForm() {
        await this.page.locator(this.firstNameField).fill(this.firstName)
        await this.page.locator(this.lastNameField).fill(this.lastName)
        await this.page.locator(this.zipcodeField).fill(this.zipcode)
     }

     public async continueCheckout() {
        await this.page.locator(this.checkoutContinueButton).click()
     }

     public async finishCheckout() {
        await this.page.locator(this.finishCheckoutButton).click()
     }

     public async seeOrderCompleteStatus(expectedMessage: string){
        const orderCompleteMessage = await this.page.locator(this.orderCompleteText).innerText()
        expect(orderCompleteMessage).toBe(expectedMessage)

    }
}