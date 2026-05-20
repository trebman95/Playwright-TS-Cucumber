import {Page} from "@playwright/test";

export class Purchase {
    private readonly page: Page
    private readonly cartButton: string ='.shopping_cart_link'
    private readonly checkoutButton: string ='#checkout'
    private readonly firstName: string ='#first-name'
    private readonly lastName: string ='#last-name'
    private readonly postalCode: string ='#postal-code'
    private readonly continueButton: string ='#continue'
    private readonly finishButton: string = '#finish'
    private readonly successMessage: string = '.complete-header'

    constructor(page: Page){
        this.page = page;
    }
    public async openCart(){
        await this.page.locator(this.cartButton).click();
    }
    public async clickCheckout(){ 
        await this.page.locator(this.checkoutButton).click();
    }
    public async fillCheckoutDetails(){
        await this.page.locator(this.firstName).fill('Praveen');
        await this.page.locator(this.lastName).fill('Kumar');
        await this.page.locator(this.postalCode).fill('600001');
    }
    public async clickContinue(){
        await this.page.locator(this.continueButton).click();
    }
    public async clickFinish(){
        await this.page.locator(this.finishButton).click();
    }
    public async getSuccessMessage(){
        return await this.page.locator(this.successMessage)
                    .textContent();
    }
}