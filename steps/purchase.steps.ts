import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";

// Each Gherkin checkout step maps to one focused page-object method.
Then("I open the cart", async () => {
  await new Purchase(getPage()).openCart();
});

Then("I proceed to checkout", async () => {
  await new Purchase(getPage()).proceedToCheckout();
});

Then(
  "I enter checkout information with first name {string}, last name {string}, and postal code {string}",
  async (firstName, lastName, postalCode) => {
    // Parameters are passed in the same order as the placeholders above.
    await new Purchase(getPage()).enterCheckoutInformation(
      firstName,
      lastName,
      postalCode,
    );
  },
);

Then("I continue checkout", async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then("I finish the purchase", async () => {
  await new Purchase(getPage()).finishPurchase();
});

Then(
  "I should see the successful purchase message {string}",
  async (expectedMessage) => {
    await new Purchase(getPage()).validateSuccessfulPurchaseMessage(
      expectedMessage,
    );
  },
);
