import { expect, Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    public async checkout(){
        await this.page.getByText('1', {exact: true}).click();
        await this.page.getByRole('button', {name:'Checkout'}).click();

        await this.page.getByRole('textbox', {name: 'First Name'}).fill('Firsterson');
        await this.page.getByRole('textbox', {name:'Last Name'}).fill('Lasterson');
        await this.page.getByRole('textbox', {name:'Zip/Postal Code'}).fill('11111');

        await this.page.getByRole('button', {name:'Continue'}).click();

        await this.page.getByRole('button', {name:'Finish'}).click();
    }

    public async thankYou(){
        await expect(this.page.getByRole('heading', {name:'Thank you for your order!'})).toBeVisible();
    }
}
