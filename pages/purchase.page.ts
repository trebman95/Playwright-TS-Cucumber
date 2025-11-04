import { Page } from "@playwright/test"
import { DEFAULT_TIMEOUT } from '../playwrightUtilities';

export class Purchase {
    private readonly page: Page
    private readonly backpackAddButton: string = 'button[data-test="add-to-cart-sauce-labs-backpack"]'
    private readonly shoppingCartLink: string = 'a.shopping_cart_link'
    private readonly checkoutButton: string = 'button[data-test="checkout"]'
    private readonly firstNameInput: string = 'input[data-test="firstName"]'
    private readonly lastNameInput: string = 'input[data-test="lastName"]'
    private readonly zipCodeInput: string = 'input[data-test="postalCode"]'
    private readonly continueButton: string = 'input[data-test="continue"]'
    private readonly finishButton: string = 'button[data-test="finish"]'
    private readonly confirmationMessage: string = '.complete-header'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackpackToCart() {
        await this.page.locator(this.backpackAddButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.backpackAddButton).click();
    }

    public async clickShoppingCart() {
        await this.page.locator(this.shoppingCartLink).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.shoppingCartLink).click();
    }

    public async clickCheckout() {
        await this.page.locator(this.checkoutButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.checkoutButton).click();
    }

    public async fillShippingInfo(firstName: string, lastName: string, zipCode: string) {
        await this.page.locator(this.firstNameInput).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.zipCodeInput).fill(zipCode);
    }

    public async clickContinue() {
        await this.page.locator(this.continueButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.continueButton).click();
    }

    public async clickFinish() {
        await this.page.locator(this.finishButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.finishButton).click();
    }

    public async validateConfirmationMessage(expectedMessage: string) {
        const locator = this.page.locator(this.confirmationMessage);
        await locator.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        const actual = (await locator.innerText())?.trim() ?? '';
        if (actual !== expectedMessage) {
            throw new Error(`Expected confirmation message to be "${expectedMessage}" but found "${actual}"`);
        }
    }
}