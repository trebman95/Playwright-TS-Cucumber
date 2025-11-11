import { Page } from "@playwright/test"

export class CheckoutStepTwo {
    private readonly page: Page
    private readonly finishButton: string = '#finish'
    private readonly itemPrice: string = '[data-test="inventory-item-price"]'
    private readonly taxLabel: string = '[data-test="tax-label"]'
    private readonly totalLabel: string = '[data-test="total-label"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async clickFinish() {
        await this.page.locator(this.finishButton).click();
    }

    public async validateItemPrice(expectedPrice: string) {
        const priceElement = await this.page.locator(this.itemPrice).first();
        const actualPrice = await priceElement.textContent();
        if (actualPrice !== expectedPrice) {
            throw new Error(`Expected price to be "${expectedPrice}" but found "${actualPrice}"`);
        }
    }

    public async validateTax(expectedTax: string) {
        const taxElement = await this.page.locator(this.taxLabel);
        const actualTax = await taxElement.textContent();
        
        // Get the item price from the page
        const priceElement = await this.page.locator(this.itemPrice).first();
        const priceText = await priceElement.textContent();
        const price = parseFloat(priceText?.replace('$', '') || '0');
        
        // Calculate 8% tax and round to nearest tenth
        const calculatedTax = Math.round((price * 0.08) * 10) / 10;
        const expectedCalculatedTax = '$' + calculatedTax.toFixed(2);
        
        if (!actualTax?.includes(calculatedTax.toString())) {
            throw new Error(`Expected tax to be 8% of $${price.toFixed(2)} which is ${expectedCalculatedTax}, but found "${actualTax}"`);
        }
    }

    public async validateTotal() {
        // Get the item price from the page
        const priceElement = await this.page.locator(this.itemPrice).first();
        const priceText = await priceElement.textContent();
        const price = parseFloat(priceText?.replace('$', '') || '0');
        
        // Calculate 8% tax and round to nearest tenth
        const calculatedTax = Math.round((price * 0.08) * 10) / 10;
        
        // Calculate total (price + tax)
        const calculatedTotal = price + calculatedTax;
        const expectedTotal = '$' + calculatedTotal.toFixed(2);
        
        // Get the total from the page
        const totalElement = await this.page.locator(this.totalLabel);
        const actualTotal = await totalElement.textContent();
        
        if (!actualTotal?.includes(calculatedTotal.toString())) {
            throw new Error(`Expected total to be $${price.toFixed(2)} + $${calculatedTax.toFixed(2)} = ${expectedTotal}, but found "${actualTotal}"`);
        }
    }
}
