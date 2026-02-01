import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Product } from "../pages/product.page";

Then("I sort products by {string}", async (sortValue) => {
  await new Product(getPage()).sortBy(sortValue);
});

Then("products should be sorted in {string} price order", async (order) => {
  const sortOrder = order === 'low to high' ? 'asc' : 'desc';
  await new Product(getPage()).validatePricesSorted(sortOrder);
});
