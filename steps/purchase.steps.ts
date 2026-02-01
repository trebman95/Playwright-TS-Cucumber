import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";
import { Product } from "../pages/product.page";


Then("I will add the backpack to the cart", async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then("I open the cart", async () => {
  await new Purchase(getPage()).openCart();
});

Then("I checkout", async () => {
  await new Purchase(getPage()).checkout();
});

Then(
  "I enter checkout information first name {string} last name {string} zip {string}",
  async (first, last, zip) => {
    await new Purchase(getPage()).fillShippingInfo(first, last, zip);
  }
);

Then("I continue to overview", async () => {
  await new Purchase(getPage()).continue();
});

Then("I finish the purchase", async () => {
  await new Purchase(getPage()).finish();
});

Then("I should see purchase confirmation text {string}", async (expected) => {
  await new Purchase(getPage()).validateThankYouText(expected);
});
