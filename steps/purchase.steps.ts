import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";

Then("I will add the backpack to the cart", async () => {
  await new Purchase(getPage()).addBackPackToCart();
});

Then("I will click the cart button", async () => {
  await new Purchase(getPage()).clickCartButton();
});

Then("I will click the checkout button", async () => {
  await new Purchase(getPage()).clickCheckoutButton();
});

Then(
  "I will fill the checkout form as {string} {string}, {string}",
  async (firstName, lastName, zipCode) => {
    await new Purchase(getPage()).fillCheckoutForm(firstName, lastName, `${zipCode}`);
  },
);

Then("I will click the continue button", async () => {
  await new Purchase(getPage()).clickContinueButton();
});

Then("I will click the finish button", async () => {
  await new Purchase(getPage()).clickFinishButton();
});

Then("The checkout success container should be visible", async () => {
  await new Purchase(getPage()).assertSuccessContainerVisible();
});

Then("The checkout success header should read {string}", async (expectedText) => {
  await new Purchase(getPage()).assertSuccessHeaderCorrect(expectedText);
});

Then("The checkout success text should read {string}", async (expectedText) => {
  await new Purchase(getPage()).assertSuccessTextCorrect(expectedText);
});

Then("I will add {string} to the cart", async (itemName) => {
  await new Purchase(getPage()).addItemToShoppingCart(itemName);
});

Then("The shopping cart badge count should be {int}", async (count) => {
  await new Purchase(getPage()).assertShoppingCartBadgeCount(count);
});

Then("The cart should contain {string}", async (itemName) => {
  await new Purchase(getPage()).assertItemIsVisibleInCart(itemName);
});

Then("I will remove {string} from the cart", async (itemName) => {
  await new Purchase(getPage()).removeItemFromCart(itemName);
});

Then("The cart should not contain {string}", async (itemName) => {
  await new Purchase(getPage()).assertItemIsNotVisibleInCart(itemName);
});
