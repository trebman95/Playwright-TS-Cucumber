import { Page } from "@playwright/test"
import { DEFAULT_TIMEOUT } from '../playwrightUtilities';

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = '[data-test="product_sort_container"]'
    private readonly inventoryItems: string = '.inventory_item'
    private readonly itemPrice: string = '.inventory_item_price'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.page.locator(this.addToCart).click();
    }

    public async selectSortOption(option: string) {
        const dropdown = this.page.locator(this.sortDropdown);
        await dropdown.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });

        // Normalize incoming option
        const normalized = option?.trim();
        if (!normalized) {
            throw new Error('Empty sort option provided');
        }

        // Try selecting by visible label first (human readable)
        try {
            await dropdown.selectOption({ label: normalized });
            return;
        } catch (e) {
            // fall through to try known value mappings
        }

        // Common SauceDemo option values (fallback)
        const valueMap: Record<string, string> = {
            'Price (low to high)': 'lohi',
            'Price (high to low)': 'hilo',
            'Name (A to Z)': 'az',
            'Name (Z to A)': 'za'
        };

        const fallbackValue = valueMap[normalized];
        if (fallbackValue) {
            try {
                await dropdown.selectOption({ value: fallbackValue });
                return;
            } catch (err) {
                // continue to JS fallback
            }
        }

        // Final fallback: set value via JS and dispatch change event
        try {
            await this.page.evaluate(({ sel, val }: { sel: string; val: string }) => {
                const el = document.querySelector(sel) as HTMLSelectElement | null;
                if (!el) throw new Error('Sort dropdown not found for JS fallback');
                // try to find option by text
                const opt = Array.from(el.options).find(o => o.text.trim() === val || o.value === val);
                if (opt) {
                    el.value = opt.value;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    throw new Error('No matching option found for fallback');
                }
            }, { sel: this.sortDropdown, val: normalized });
            return;
        } catch (finalErr) {
            throw new Error(`Could not select sort option '${option}': ${finalErr}`);
        }
    }

    public async validatePriceSorting(direction: 'ascending' | 'descending'): Promise<void> {
        // Get all prices and convert them to numbers
        await this.page.locator(this.itemPrice).first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        const priceElements = await this.page.locator(this.itemPrice).all();
        const prices = await Promise.all(
            priceElements.map(async (el) => {
                const priceText = await el.innerText();
                return parseFloat(priceText.replace('$', ''));
            })
        );

        // Create a sorted copy to compare against
        const sortedPrices = [...prices].sort((a, b) => 
            direction === 'ascending' ? a - b : b - a
        );

        // Compare the actual prices with the sorted prices
        const isCorrectlySorted = prices.every((price, index) => price === sortedPrices[index]);
        
        if (!isCorrectlySorted) {
            throw new Error(
                `Products are not correctly sorted by price ${direction}.\n` +
                `Expected order: ${sortedPrices.map(p => '$' + p).join(', ')}\n` +
                `Actual order: ${prices.map(p => '$' + p).join(', ')}`
            );
        }
    }
}