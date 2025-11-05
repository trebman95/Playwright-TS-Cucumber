import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { PurchasePage } from "../pages/purchase.page";

Then('I will login as {string}', async (username: string) => {
  await new PurchasePage(getPage()).login(username);
});

Then('I will add the backpack to the cart', async () => {
  await new PurchasePage(getPage()).addBackpackToCart();
});

Then('I will open the cart', async () => {
  await new PurchasePage(getPage()).openCart();
});

Then('I will click on Checkout', async () => {
  await new PurchasePage(getPage()).clickCheckout();
});

Then('I will fill in the details {string} {string} {string}', async (firstName: string, lastName: string, postalCode: string) => {
  await new PurchasePage(getPage()).fillDetails(firstName, lastName, postalCode);
});

Then('I will click Continue', async () => {
  await new PurchasePage(getPage()).clickContinue();
});

Then('I will click Finish', async () => {
  await new PurchasePage(getPage()).clickFinish();
});

Then('I should see the text {string}', async (expectedText: string) => {
  await new PurchasePage(getPage()).validateOrderConfirmation(expectedText);
});
