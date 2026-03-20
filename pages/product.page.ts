import { Page, expect } from "@playwright/test";



export class Product {
    private readonly page: Page;

    //product selectors
    private readonly addBackpackBtn: string = 'button[id="add-to-cart-sauce-labs-backpack"]';

    //sorting selectors
    private readonly sortSelect = '[data-test="product-sort-container"]';
    private readonly priceCells = '.inventory_item_price';
    private readonly sortSelectFallback = '#header_container select';
    
    constructor(page: Page) {
        this.page = page;
    }

    //product actions
    async addBackpack() {
        await this.page.locator(this.addBackpackBtn).click();
    }

    //sorting actions
    public async applySort(sortText: string) {
    // Ensure we are on the inventory page after login
        await this.page.waitForURL(/\/inventory\.html$/);

        const select = this.page.locator(`${this.sortSelect}, ${this.sortSelectFallback}`).first();
        await select.waitFor({ state: 'visible' });

    //selecting by label first
        try {
        await select.selectOption({ label: sortText });
        } catch {
        //fallback logic
        const normalized = sortText.trim().toLowerCase();
        const value =
          normalized.includes('low to high') ? 'lohi' :
          normalized.includes('high to low') ? 'hilo' :
          undefined;

        if (!value) {
          const available = await select.locator('option').allTextContents();
          throw new Error(
            `Cannot select sort option "${sortText}". ` +
            `Available options: ${available.map(s => `"${s.trim()}"`).join(', ')}`
          );
        }
        
        await select.selectOption({ value });
    }

    //wait for sort completing
    await this.page.waitForLoadState('networkidle');
    }


    private async getDisplayedPrices(): Promise<number[]> {
        await this.page.locator(this.priceCells).first().waitFor({ state: 'visible', timeout: 10000 });
        
        const texts = await this.page.locator(this.priceCells).allTextContents();
        return texts.map(t => parseFloat(t.replace('$', '').trim()));
    }

    public async assertPricesAreSorted(direction: 'asc' | 'desc') {
        const displayedPrices  = await this.getDisplayedPrices();
        if (displayedPrices .length !== 6) {
            throw new Error(`Expected 6 products, got ${displayedPrices.length}. Prices: [${displayedPrices.join(', ')}]`);
        }

        const sorted = [...displayedPrices].sort((a, b) => a - b);
        if (direction === 'desc') sorted.reverse();

        expect(displayedPrices, `Prices not sorted ${direction}. Actual: [${displayedPrices.join(', ')}]`)
            .toEqual(sorted);
    }




}