import { Page } from "@playwright/test"
import exp from "node:constants";

export class Purchase {
    // constants
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly firstName: string = 'standard'
    private readonly lastName: string = 'user'
    private readonly postalCode: string = '12345'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly firstNameField: string = 'input[id="first-name"]'
    private readonly lastNameField: string = 'input[id="last-name"]'
    private readonly postalCodeField: string = 'input[id="postal-code"]'
    private readonly completeHeader: string = 'h2[class="complete-header"]'
    private readonly continueButton: string = 'input[id="continue"]'


    constructor(page: Page) {
        this.page = page;
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    public async goToCart(){
        await this.page.locator('a[class="shopping_cart_link"]').click()
    }

    public async click(clickId: string){
        await this.page.locator(`button[id="${clickId}"]`).click()
    }

    public async clickContinue(){
        await this.page.locator(this.continueButton).click()
    }

    public async fillInInfo(){
        await this.page.locator(this.firstNameField).fill(this.firstName)
        await this.page.locator(this.lastNameField).fill(this.lastName)
        await this.page.locator(this.postalCodeField).fill(this.postalCode)
    }

    public async validateComplete(expectedHeader: string){
        const headerText:string|null = await this.page.locator(this.completeHeader).textContent()

        if (headerText !== expectedHeader)
        {
            throw new Error(`Expected complete header to be "${expectedHeader}" but found "${headerText}"`)
        }
    }
}










