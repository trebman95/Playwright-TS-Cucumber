import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";

Then(
  "I will validate Cart Badge shows {int} item",
  async (itemCount: number) => {
    await new Purchase(getPage()).validateCartBadgeShowsItems(itemCount);
  },
);

Then("I will click on the cart icon", async () => {
  await new Purchase(getPage()).clickOnCartIcon();
});

Then("I will click on the checkout button", async () => {
  await new Purchase(getPage()).clickOnCheckoutButton();
});

Then("I will Fill in the First Name, Last Name, and Zip Code", async () => {
  await new Purchase(getPage()).fillInCheckoutInformation(
    "John",
    "Doe",
    "12345",
  );
});

Then("I will click on the continue button", async () => {
  await new Purchase(getPage()).clickOnContinueButton();
});

Then("I will click on the finish button", async () => {
  await new Purchase(getPage()).clickOnFinishButton();
});

Then("I should see the text 'Thank you for your order!'", async () => {
  await new Purchase(getPage()).validateThankYouMessage();
});
