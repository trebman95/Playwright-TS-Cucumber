import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly addToCartbackpack: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly addToCartbikeLight: string = 'button[id="add-to-cart-sauce-labs-bike-light"]'
    private readonly addToCartboltTShirt: string = 'button[id="add-to-cart-sauce-labs-bolt-t-shirt"]'
    

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async validateProductAddedToCart() {
        const cartBadgeLocator = this.page.locator('span[class="shopping_cart_badge"]');
        const cartBadgeText = await cartBadgeLocator.textContent();     
        if (cartBadgeText !== '1') {
          throw new Error(`Expected cart badge to be 1 but found ${cartBadgeText}`);
        }   
    }

    public async navigateToCart() {
        await this.page.locator('a[class="shopping_cart_link"]').click()
    }

    public async sortItemsBy(sortOption: string) {
        const sortDropdown = this.page.locator('select[data-test="product-sort-container"]');
        await sortDropdown.selectOption({ label: sortOption });
    }   

    public async additemToCartByName(itemName: string) {
        if (itemName === 'Backpack') {
            await this.page.locator(this.addToCartbackpack).click();
        }   else if (itemName === 'Bike Light') {        
            await this.page.locator(this.addToCartbikeLight).click();
        }   else if (itemName === 'Bolt T-Shirt') {
            await this.page.locator(this.addToCartboltTShirt).click();
        }
    }   
}