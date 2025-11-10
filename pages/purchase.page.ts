import { Page, expect } from "@playwright/test"

export class purchase {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly cartIcon = '.shopping_cart_link';
    private readonly checkoutButton = '#checkout';
    private readonly firstNameField = '#first-name';
    private readonly lastNameField = '#last-name';
    private readonly postalCodeField = '#postal-code';
    private readonly continueButton = '#continue';
    private readonly finishButton = '#finish';
    private readonly confirmationMessage = '.complete-header';


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }
    public async selectCart() {
        await this.page.locator(this.cartIcon).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillUserInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.postalCodeField).fill(postalCode);
}

    public async selectContinue() {
        await this.page.locator(this.continueButton).click();
}

    public async selectFinish() {
        await this.page.locator(this.finishButton).click();
}

    public async validateConfirmationMessage(expectedMessage: string) {
        await expect(this.page.locator(this.confirmationMessage)).toHaveText(expectedMessage);
}
}

