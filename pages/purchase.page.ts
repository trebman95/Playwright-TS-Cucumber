import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly cartButton :string = 'a[class="shopping_cart_link"]'
    private readonly checkoutButton : string ='button[id="checkout"]'
    private readonly firstName : string ='input[id="first-name"]'
    private readonly lastName : string='input[id="last-name"]'
    private readonly postalCode : string ='input[id="postal-code"]'
    private readonly continueButton : string = 'input[id="continue"]'
    private readonly finishButton : string = 'button[id="finish"]'
    private readonly confirmationMessage : string = 'h2[data-test="complete-header"]'
  
    constructor(page: Page) {
        this.page = page;
    }

     public async selectCart() {
        await this.page.locator(this.cartButton).click();
    }
    public async clickCheckout(){
        await this.page.locator(this.checkoutButton).click();
    }
    public async fillUserDetails(firstName:string, lastName:string, postalCode:string){
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.postalCode).fill(postalCode);
    }

    public async clickContinue()
    {
        await this.page.locator(this.continueButton).click();
    }

       public async clickFinish()
    {
        await this.page.locator(this.finishButton).click();
    }
    public async validateConfirmationMessage(expectedMessage :string)
    {
       const actualMessage = await this.page.textContent(this.confirmationMessage);
       if (actualMessage !== expectedMessage) {
          throw new Error(`Expected confirmation message to be ${expectedMessage} but found ${actualMessage}`);
        }
    }
 
}