import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PurchasePage } from "../pages/purchase.page";
import { getPage } from "../playwrightUtilities";

Then('I will add the backpack to the cart', async () => {
  const purchasePage = new PurchasePage(getPage());
  await purchasePage.addBackpackToCart();
});

Then('I will select the cart icon', async () => {
  const purchasePage = new PurchasePage(getPage());
  await purchasePage.clickCartIcon();
});

Then('I will select Checkout', async () => {
  const purchasePage = new PurchasePage(getPage());
  await purchasePage.clickCheckout();
});

Then('I will fill in the First Name, Last Name, and Zip\\/Postal Code', async () => {
  const purchasePage = new PurchasePage(getPage());
  await purchasePage.enterCheckoutInfo("Kesavaram", "Thripuraneni", "45040");
});

Then('I will select Continue', async () => {
  const purchasePage = new PurchasePage(getPage());
  await purchasePage.clickContinue();
});

Then('I will select Finish', async () => {
  const purchasePage = new PurchasePage(getPage());
  await purchasePage.clickFinish();
});

Then("I will validate the text 'Thank you for your order!'", async () => {
  const purchasePage = new PurchasePage(getPage());
  await expect(purchasePage.getConfirmationMessage()).toHaveText("Thank you for your order!");
});
