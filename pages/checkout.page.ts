import {expect, Page} from "@playwright/test"
import { faker } from '@faker-js/faker'

export class Checkout {
    private readonly page: Page
    private readonly checkoutButton: string = 'button[data-test="checkout"]'
    private readonly checkoutFirstName: string = 'input[data-test="firstName"]'
    private readonly checkoutLastName: string = 'input[data-test="lastName"]'
    private readonly checkoutZipCode: string = 'input[data-test="postalCode"]'
    private readonly continueCheckout: string = 'input[data-test="continue"]'
    private readonly finishCheckout: string = 'button[data-test="finish"]'
    private readonly thankYouMessage: string = 'h2[data-test="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async startCheckout(): Promise<void> {
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillInCheckout(): Promise<void> {
        await this.page.locator(this.checkoutFirstName).fill(faker.person.firstName());
        await this.page.locator(this.checkoutLastName).fill(faker.person.lastName());
        await this.page.locator(this.checkoutZipCode).fill(faker.location.zipCode());
    }
    public async checkoutItems(): Promise<void> {
        await this.page.locator(this.continueCheckout).click();
        await this.page.locator(this.finishCheckout).click();
        await expect(this.page.locator(this.thankYouMessage)).toHaveText('Thank you for your order!')
    }
}