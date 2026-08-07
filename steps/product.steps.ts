import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Product } from "../pages/product.page";

Then("I will add the backpack to the cart", async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then("I will sort the items by {string}", async (sort: string) => {
  await new Product(getPage()).sortItemsBy(sort);
});

Then(
  "I will validate all 6 items are sorted correctly by price {string}",
  async (sort: string) => {
    await new Product(getPage()).validateItemsAreSortedByPrice(sort);
  },
);
