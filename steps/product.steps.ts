import { When, Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { ProductPage } from "../pages/product.page";

When("I sort products by {string}", async (sortType: string) => {
  await new ProductPage(getPage()).sortProductsBy(sortType);
});

Then("I should see the products arranged in {word} order", async (order: string) => {
  const productPage = new ProductPage(getPage());
  const prices = await productPage.getDisplayedPrices();

  if (order === "ascending") {
    const sorted = await productPage.isSortedAscending(prices);
    if (!sorted) throw new Error(`Prices are not sorted in ascending order: ${prices}`);
  } else if (order === "descending") {
    const sorted = await productPage.isSortedDescending(prices);
    if (!sorted) throw new Error(`Prices are not sorted in descending order: ${prices}`);
  } else {
    throw new Error(`Unknown order type: ${order}`);
  }
});
