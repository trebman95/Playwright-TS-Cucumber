import { Page } from "@playwright/test"

export class Purchase {
    private readonly page: Page
    private readonly clickShoppingcartlink: string = '.shopping_cart_link'

    constructor(page: Page) {
        this.page = page;
    }

    public async clickShoppingCart() {
        await this.page.locator(this.clickShoppingcartlink).click()
    }
    
       public async clickCheckout() {
           await this.page.click("#checkout");
       }
            public async fillCheckoutInformation() {
          await this.page.fill("#first-name", "John");
          await this.page.fill("#last-name", "Doe");
          await this.page.fill("#postal-code", "560001");
      }
      public async clickContinue() {
          await this.page.click("#continue");
          }
        public async clickFinish() {
            await this.page.click("#finish");
        }
        public async validateTitle(expectedTitle: 'Thank you for your order!') {const pageTitle = await this.page.title();
        if (pageTitle == expectedTitle) {
          throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
        }
        }

public async sortItems(sortType: string) {
  await this.page.selectOption(".product_sort_container", sortType);

  const priceElements = await this.page.locator(".inventory_item_price").allTextContents();
  const priceTexts = priceElements.map((text: string) => text.trim());

  interface PriceValidation {
      expectedCount: number;
      actualCount: number;
  }

  const priceValidation: PriceValidation = {
      expectedCount: 6,
      actualCount: priceTexts.length
  };

  if (priceValidation.actualCount !== priceValidation.expectedCount) {
      throw new Error(`❌ Expected ${priceValidation.expectedCount} items but found: ${priceValidation.actualCount}`);
  }

  const actualPrices = priceTexts.map((p: string) => parseFloat(p.replace("$", "")));

  // Create expected sorted list
  const expectedPrices = [...actualPrices];

  if (sortType === "Price (low to high)") {
    expectedPrices.sort((a, b) => a - b);
  } else if (sortType === "Price (high to low)") {
    expectedPrices.sort((a, b) => b - a);
  }

  // Compare actual vs expected
  if (JSON.stringify(actualPrices) !== JSON.stringify(expectedPrices)) {
    throw new Error(`❌ Sorting failed for: ${sortType}\nActual: ${actualPrices}\nExpected: ${expectedPrices}`);
  }

}
}
