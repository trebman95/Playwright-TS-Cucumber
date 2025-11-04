import { expect,Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]';
    private readonly addTShirt: string = '//*[@id="add-to-cart-sauce-labs-bolt-t-shirt"]';
    private readonly CartIcon: string = 'a.shopping_cart_link';
    private readonly selectOptions = '.product_sort_container'
    private readonly sortDropdown = 'select.product_sort_container';
    private readonly productPriceElements = 'div.inventory_items_price';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
        await this.page.waitForTimeout(2000);
    } 

    public async addTShirtToCart() {
        await this.page.locator(this.addTShirt).click();
        await this.page.waitForTimeout(2000);
    } 


    public async selectCart() {
        await this.page.locator(this.CartIcon).click()
    }
    async sortItems(sortOption: string) {
        await this.page.selectOption(this.selectOptions, { label: sortOption });
    }

    async getSortedPrices(): Promise<number[]> {
        const prices = await this.page.$$eval('.inventory_item_price', items =>
            items.map(item => {
                const text = item.textContent;
                return text ? parseFloat(text.replace('$', '')) : 0;
            })
        );
        return prices;
    }

    async validateSorting(sortOption: string) {
        const prices = await this.getSortedPrices();
        const sortedPrices = [...prices];

        if (sortOption === 'Price (low to high)') {
            sortedPrices.sort((a, b) => a - b);
        } else if (sortOption === 'Price (high to low)') {
            sortedPrices.sort((a, b) => b - a);
        }

        expect(prices).toEqual(sortedPrices);
    }


}