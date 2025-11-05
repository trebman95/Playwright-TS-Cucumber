import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async openCart() {
        await this.page.locator('a[class="shopping_cart_link"]').click()
    }

    public async clickCheckout() {
  const checkoutButton = this.page.locator('button[id="checkout"]');
  await checkoutButton.waitFor({ state: 'visible', timeout: 20000 });
  await checkoutButton.scrollIntoViewIfNeeded();
  await checkoutButton.click();
  console.log('✅ Clicked checkout button successfully');
}


    public async selectSortOrder(sortOrder: string) {
    const dropdown = this.page.locator('select[data-test="product-sort-container"]'); 
    await dropdown.waitFor({ state: 'visible', timeout: 20000 }); // wait up to 10s for the dropdown to be visible
    const text = await dropdown.textContent();
    console.log(text);
    await dropdown.click();
    await dropdown.selectOption({ label: sortOrder
    });
  }
  
    public async getAllProductPrices(): Promise<number[]> {
    const priceElements = this.page.locator('.inventory_item_price');
    const count = await priceElements.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
        if (priceText) {
            const price = parseFloat(priceText.replace('$', ''));
            prices.push(price);
        }
    }
    return prices;
  }
}