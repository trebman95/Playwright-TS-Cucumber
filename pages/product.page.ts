import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select[data-test="product-sort-container"]'
    private readonly productPrices: string = '.inventory_item_price'
    private readonly productNames: string = '.inventory_item_name'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortProductsByOption(sortOption: string) {
        const dropdown = this.page.locator(this.sortDropdown)
        await dropdown.waitFor({ state: 'visible' })
        await dropdown.selectOption({ value: this.getSortOptionValue(sortOption) })
    }

    public async validateProductsSorted(sortOption: string) {
        const normalized = sortOption.toLowerCase()

        if (normalized.includes('price')) {
            await this.validatePriceSort(sortOption)
            return
        }

        if (normalized.includes('name')) {
            await this.validateNameSort(sortOption)
            return
        }

        throw new Error(`Unsupported sort option: ${sortOption}`)
    }

    private async validatePriceSort(sortOption: string) {
        const prices = await this.page.locator(this.productPrices).allTextContents()
        const values = prices.map((value) => Number(value.replace('$', '')))
        const sortedValues = [...values].sort((a, b) => a - b)
        const expectedValues = this.isHighToLow(sortOption) ? [...sortedValues].reverse() : sortedValues

        if (JSON.stringify(values) !== JSON.stringify(expectedValues)) {
            throw new Error(`Expected prices to be sorted ${sortOption}, but found ${values.join(', ')}`)
        }
    }

    private async validateNameSort(sortOption: string) {
        const names = await this.page.locator(this.productNames).allTextContents()
        const normalizedNames = names.map((name) => name.trim().toLowerCase())
        const sortedNames = [...normalizedNames].sort((a, b) => a.localeCompare(b))
        const expectedNames = this.isNameDescending(sortOption) ? [...sortedNames].reverse() : sortedNames

        if (JSON.stringify(normalizedNames) !== JSON.stringify(expectedNames)) {
            throw new Error(`Expected names to be sorted ${sortOption}, but found ${names.join(', ')}`)
        }
    }

    private getSortOptionValue(sortOption: string): string {
        const normalized = sortOption.toLowerCase()

        if (normalized.includes('price')) {
            return normalized.includes('high') ? 'hilo' : 'lohi'
        }

        if (normalized.includes('name')) {
            return normalized.includes('z to a') || normalized.includes('z') ? 'za' : 'az'
        }

        throw new Error(`Unsupported sort option: ${sortOption}`)
    }

    private isHighToLow(sortOption: string): boolean {
        return sortOption.toLowerCase().includes('high')
    }

    private isNameDescending(sortOption: string): boolean {
        return sortOption.toLowerCase().includes('z')
    }
}