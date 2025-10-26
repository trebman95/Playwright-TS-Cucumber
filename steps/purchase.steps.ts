import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { PurchasePage } from "../pages/purchase.page";

Then("I will add the backpack to the cart for purchase", async () => {
  await new PurchasePage(getPage()).addBackpackToCart();
});


Then("I proceed to checkout", async () => {
  await new PurchasePage(getPage()).proceedToCheckout();
});

Then(
  "I enter checkout information {string} {string} {string}",
  async (first, last, zip) => {
    await new PurchasePage(getPage()).enterCheckoutInfo(first, last, zip);
  }
);

Then("I finish the purchase", async () => {
  await new PurchasePage(getPage()).finishPurchase();
});

Then("I should see the success message {string}", async (expectedMsg) => {
  const purchase = new PurchasePage(getPage());
  const actualMsg = await purchase.getSuccessMessage();
  if (actualMsg !== expectedMsg) {
    throw new Error(`Expected success message "${expectedMsg}" but got "${actualMsg}"`);
  }
});
