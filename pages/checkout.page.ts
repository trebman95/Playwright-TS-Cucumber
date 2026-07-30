import { Page, expect } from "@playwright/test"

export class Checkout {
    private readonly page: Page
    private readonly firstNameInput: string = '//input[@data-test="firstName"]'
    private readonly lastNameInput: string = '//input[@data-test="lastName"]'
    private readonly zipCodeInput: string = '//input[@data-test="postalCode"]'
    private readonly continueButton: string = '//*[@data-test="continue"]'
    private readonly finishButton: string = '//*[@data-test="finish"]'
    private readonly completeText: string = '//*[@data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }
    public async submitCheckoutForm(firstname: string, lastname: string, zipcode: string) {
        await this.page.locator(this.firstNameInput).fill(firstname)
        await this.page.locator(this.lastNameInput).fill(lastname)
        await this.page.locator(this.zipCodeInput).fill(zipcode)
        await this.page.locator(this.continueButton).click()
        await this.page.locator(this.finishButton).click()   
    }

    public async validateCompletedMessage(message: string) {
        expect(message).toEqual(await this.page.locator(this.completeText).textContent())
    }

}