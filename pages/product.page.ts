import { Page } from "@playwright/test";

export class Product {
    private readonly page: Page;
    private readonly addToCart: string =
        'button[id="add-to-cart-sauce-labs-backpack"]';
    private readonly sortDropdown: string = ".product_sort_container";
    private readonly itemPrices: string = ".inventory_item_price";

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
    }
    public async sortProductsBy(sort: string) {
        await this.page
            .locator(this.sortDropdown)
            .selectOption({ label: sort });
    }
    public async validateProductPricesSorted(
        order: string,
        expectedCount: number,
    ) {
        const rawPrices = await this.page
            .locator(this.itemPrices)
            .allTextContents();
        const parsedPrices = rawPrices.map((price) =>
            Number(price.replace("$", "").trim()),
        );

        if (parsedPrices.length !== expectedCount) {
            throw new Error(
                `Expected ${expectedCount} products but found ${parsedPrices.length}`,
            );
        }

        const sortedPrices = [...parsedPrices].sort((a, b) => a - b);
        const expectedPrices =
            order.toLowerCase() === "descending"
                ? sortedPrices.reverse()
                : sortedPrices;
        const isSorted = parsedPrices.every(
            (price, index) => price === expectedPrices[index],
        );

        if (!isSorted) {
            throw new Error(
                `Expected prices to be sorted in ${order} order, but found [${parsedPrices.join(", ")}]`,
            );
        }
    }
}
