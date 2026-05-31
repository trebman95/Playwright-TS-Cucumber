import { Page } from '@playwright/test';

export class Purchase {
    private readonly page: Page
    
    private cartIcon: string = '.shopping_cart_link'
    private checkoutButton: string = '#checkout'
    private firstNameField: string = '#first-name'
    private lastNameField: string = '#last-name'
    private zipOrPostalCodeField: string = '#postal-code'
    private continueButton: string = '#continue'
    private finishButton: string = '#finish'
    private orderConfirmationMessage: string = '.complete-header'

    constructor(page: Page) {
        this.page = page;
    }

    public async clickOnCart() {
        await this.page.locator(this.cartIcon).click();
    }

    public async clickCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async enterUserDetails(firstName: string, lastName: string, zipOrPostalCode: string){
        await this.page.fill(this.firstNameField, firstName);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.fill(this.zipOrPostalCodeField, zipOrPostalCode);
    }

    public async clickContinue() {
        await this.page.locator(this.continueButton).click();
    }

    public async clickFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async verifyOrderConfirmationMessage(expectedMessage: string) {
        const message = await this.page.locator(this.orderConfirmationMessage).textContent();
        if (message?.trim() !== expectedMessage) {
            throw new Error('Order confirmation message not found');
        }
    }
}