import { Then, DataTable } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";

Then("I select the cart icon", async () => {
  await new Purchase(getPage()).openCart();
});

Then("I proceed to checkout", async () => {
  await new Purchase(getPage()).clickCheckout();
});

Then("I fill in the checkout information:", async (dataTable: DataTable) => {
  const data = dataTable.rowsHash() as Record<string, string>;

  const firstName = data["firstName"];
  const lastName = data["lastName"];
  const postalCode = data["postalCode"];

  if (!firstName || !lastName || !postalCode) {
    throw new Error(
      `Missing required checkout fields. Got: firstName="${firstName}", lastName="${lastName}", postalCode="${postalCode}"`
    );
  }

  await new Purchase(getPage()).fillCheckoutInformation(firstName, lastName, postalCode);
});

Then("I continue to the overview page", async () => {
  await new Purchase(getPage()).clickContinue();
});

Then("I finish the purchase", async () => {
  await new Purchase(getPage()).clickFinish();
});

Then("I should see the successful purchase message {string}", async (expectedMessage: string) => {
  await new Purchase(getPage()).validateSuccessMessage(expectedMessage);
});
