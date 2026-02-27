import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";

Then("I select the cart \\(top-right\\)", async () => {
  await new Purchase(getPage()).selectCart();
});

Then("I select Checkout", async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then("I fill in the First Name, Last Name, and Zip\\/Postal Code", async () => {
  await new Purchase(getPage()).fillCustomerInfo();
});

Then("I select Continue", async () => {
  await new Purchase(getPage()).selectContinue();
});

Then("I select Finish", async () => {
  await new Purchase(getPage()).selectFinish();
});

Then("I validate the text {string}", async (expectedText: string) => {
  await new Purchase(getPage()).validateSuccessMessage(expectedText);
});
