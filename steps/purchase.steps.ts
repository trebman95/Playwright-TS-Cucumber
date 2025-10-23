import { Then } from "@cucumber/cucumber";
import { Purchase } from "../pages/purchase.page";
import { getPage } from "../playwrightUtilities";

Then("I add the backpack item to the cart", async function () {
  await new Purchase(getPage()).addBackpackToCart();
});
Then("I click on the cart", async function () {
  await new Purchase(getPage()).clickCart();
});

Then("I select checkout", async function () {
  await new Purchase(getPage()).clickCheckout();
});
Then(
  "I fill in the First Name, Last Name, and Zip Postal Code",
  async function () {
    await new Purchase(getPage()).fillUserInfo();
  }
);
Then("I select continue", async function () {
  await new Purchase(getPage()).clickContinue();
});
Then("I select finish", async function () {
  await new Purchase(getPage()).clickFinish();
});
Then("I validate the text 'Thank you for your order!'", async function () {
  await new Purchase(getPage()).validateThankYouMessage(
    "Thank you for your order!"
  );
});
