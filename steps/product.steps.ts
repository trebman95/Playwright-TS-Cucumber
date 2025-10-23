import { Then } from "@cucumber/cucumber";
import { Product } from "../pages/product.page";
import { getPage } from "../playwrightUtilities";

Then("I sort products by {string}", async (sortOption: string) => {
  const product = new Product(getPage());
  await product.sortProducts(sortOption);
});

Then("I validate if the prices of items are sorted low to high", async () => {
  const product = new Product(getPage());
  const result = await product.validateLowToHigh();
});

Then("I validate if the prices of items are sorted high to low", async () => {
  const product = new Product(getPage());
  const result = await product.validateHighToLow();
});
