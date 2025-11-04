import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import {
  Product,
  getProductNames,
  getProductPrices,
  getSortOptionValue,
  sortNames,
  sortPrices,
} from "../pages/product.page";
import { expect } from "@playwright/test";

Then("I will add the backpack to the cart", async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then("I sort the items by {string}", async function (sortOption: string) {
  const page = getPage();
  const value = getSortOptionValue(sortOption);
  if (!value) throw new Error(`Invalid sort option: ${sortOption}`);
  await page.selectOption('[data-test="product-sort-container"]', value);
});

Then(
  "I verify that all products are sorted by {string}",
  async function (sortOption: string) {
    const page = getPage();
    if (sortOption.toLowerCase().includes("name")) {
      const names = await getProductNames(page);
      const sorted = sortNames(
        names,
        sortOption.includes("(a to z)") ? "asc" : "desc"
      );
      expect(names).toEqual(sorted);
    } else {
      const prices = await getProductPrices(page);
      const order =
        sortOption.toLowerCase() === "price (low to high)" ? "asc" : "desc";
      const sortedPrices = sortPrices(prices, order);
      expect(prices).toEqual(sortedPrices);
    }
  }
);
