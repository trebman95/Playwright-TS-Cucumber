import { expect, Page } from "@playwright/test"

export class purchase{
     private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly CartSelect: string = '//*[@class="shopping_cart_link"]'
    private readonly continue: string = '//*[@id="continue"]'
    private readonly FinalMessage:string='//*[@class="complete-header"]'
     constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()

}
    public async goToCart() {
        await this.page.locator(this.CartSelect).click();

}
public async Checkout() {
        await this.page.getByText('Checkout').click();

}
public async userdetails(firstname:string,lastname:string,pincode:number) {
        await this.page.getByPlaceholder('First Name').click();
        await this.page.getByPlaceholder('First Name').fill(firstname);
        await this.page.getByPlaceholder('Last Name').click();
        await this.page.getByPlaceholder('Last Name').fill(lastname);
         await this.page.getByPlaceholder('Zip/Postal Code').click();
        await this.page.getByPlaceholder('Zip/Postal Code').fill(pincode.toString());
}
public async Continue() {
        await this.page.locator(this.continue).click();

}
public async Finish() {
        await this.page.getByText('Finish').click();

}
public async assertMesage( message:string) {
    const actualMessage= await this.page.locator(this.FinalMessage).textContent();
    const expectedMessage=message;
    await this.page.locator(this.FinalMessage).isVisible();
    await expect( expectedMessage).toEqual(actualMessage);

}


}