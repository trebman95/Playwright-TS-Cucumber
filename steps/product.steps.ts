import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Product } from "../pages/product.page";

// These steps are reusable across product and purchase scenarios.
Then("I will add the backpack to the cart", async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then("I sort the products by {string}", async (sortOption) => {
  await new Product(getPage()).sortProductsBy(sortOption);
});

Then(
  "the products should be sorted in {string} price order",
  async (direction) => {
    // The direction comes from each row in the Scenario Outline Examples table.
    await new Product(getPage()).validateProductsSortedByPrice(direction);
  },
);

Then("the cart badge should display {string}", async (expectedCount) => {
  await new Product(getPage()).validateCartBadge(expectedCount);
});
