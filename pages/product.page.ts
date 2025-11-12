import { Page } from "@playwright/test"
import { expect } from '@playwright/test';

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sort : string = 'select[data-test="product-sort-container"]'
    private readonly itemPriceList :string ='div[data-test="inventory-item-price"]';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortBy(sortOption : string){
        await this.page.locator(this.sort).selectOption(sortOption);
    }

    public async validateSort(sortOption :string){
        
     const itemPricesText: string[] = await this.page.$$eval('div[data-test="inventory-item-price"]', elements =>
        elements.map(el => el.textContent?.trim() || '')
    );

    const itemPrices = itemPricesText.map(p => parseFloat(p.replace('$', '')));

    const sortedAscPrices = [...itemPrices].sort((a, b) => a - b);
    const sortedDscPrices = [...itemPrices].sort((a, b) => b - a);

   if(sortOption.includes("high to low"))
   {
     expect(itemPrices).toEqual(sortedDscPrices);
   }
   else if(sortOption.includes("low to high")){
 
    expect(itemPrices).toEqual(sortedAscPrices)
   }
 }
}