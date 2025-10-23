import { Page } from "@playwright/test"

export class Product {
    private readonly page: Page
    private readonly addToCart: string = 'button[id="add-to-cart-sauce-labs-backpack"]'
    private readonly sortDropdown: string = 'select.product_sort_container'
    private readonly productPrices: string = 'div.inventory_item_price'
    private readonly productNames: string = 'div.inventory_item_name'
    private readonly cartBadge: string = 'span.shopping_cart_badge'

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click()
    }

    public async sortProducts(sortOption: string) {
        await this.page.locator(this.sortDropdown).selectOption({ label: sortOption })
    }

    public async validateProductsSortedByPrice(sortOption: string) {
        await this.page.waitForTimeout(1000);
        const priceElements = await this.page.locator(this.productPrices).all()
        const prices: number[] = []
        
        for (const priceElement of priceElements) {
            const priceText = await priceElement.textContent()
            const price = parseFloat(priceText!.replace('$', ''))
            prices.push(price)
        }

        const sortedPrices = [...prices]
        if (sortOption === 'Price (low to high)') {
            sortedPrices.sort((a, b) => a - b)
        } else if (sortOption === 'Price (high to low)') {
            sortedPrices.sort((a, b) => b - a)
        } else if (sortOption === 'Name (A to Z)' || sortOption === 'Name (Z to A)') {
            return;
        }

        const areSorted = JSON.stringify(prices) === JSON.stringify(sortedPrices)
        if (!areSorted) {
            throw new Error(`Products are not sorted correctly. Expected: ${sortedPrices}, but found: ${prices}`)
        }
    }

    public async validateProductsSortedByName(sortOption: string) {
        await this.page.waitForTimeout(1000);
        const nameElements = await this.page.locator(this.productNames).all()
        const names: string[] = []
        
        for (const nameElement of nameElements) {
            const nameText = await nameElement.textContent()
            names.push(nameText!)
        }

        const sortedNames = [...names]
        if (sortOption === 'Name (A to Z)') {
            sortedNames.sort()
        } else if (sortOption === 'Name (Z to A)') {
            sortedNames.sort().reverse()
        }

        const areSorted = JSON.stringify(names) === JSON.stringify(sortedNames)
        if (!areSorted) {
            throw new Error(`Products are not sorted correctly by name. Expected: ${sortedNames}, but found: ${names}`)
        }
    }

    public async addProductToCart(productName: string) {
        const buttonId = `add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`
        await this.page.locator(`button[id="${buttonId}"]`).click()
    }

    public async removeProductFromCart(productName: string) {
        const buttonId = `remove-${productName.toLowerCase().replace(/\s+/g, '-')}`
        await this.page.locator(`button[id="${buttonId}"]`).click()
    }

    public async validateCartBadgeCount(expectedCount: string) {
        const badgeText = await this.page.locator(this.cartBadge).textContent()
        if (badgeText !== expectedCount) {
            throw new Error(`Expected cart badge to show ${expectedCount} but found ${badgeText}`)
        }
    }
}

