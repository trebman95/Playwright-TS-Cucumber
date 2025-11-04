import { Then } from "@cucumber/cucumber";
import { Checkout } from "../pages/checkout.page";
import { getPage } from "../playwrightUtilities";

Then("I select the cart", async () => {
  await new Checkout(getPage()).openCart();
});

Then("I select Checkout", async () => {
  await new Checkout(getPage()).startCheckout();
});

Then("I fill in the First Name, Last Name, and Zip Code", async () => {
  await new Checkout(getPage()).fillCheckoutInfo();
});

Then("I select Continue", async () => {
  await new Checkout(getPage()).continueCheckout();
});

Then("I select Finish", async () => {
  await new Checkout(getPage()).finishCheckout();
});

Then("I validate the text 'Thank you for your order!'", async () => {
  await new Checkout(getPage()).verifySuccess();
});
