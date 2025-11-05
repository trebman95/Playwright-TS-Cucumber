
import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PurchasePage } from '../pages/purchase.pages';
import { getPage } from '../playwrightUtilities';

// Helper to create a PurchasePage tied to the initialized Playwright Page
const getPurchasePage = () => new PurchasePage(getPage());

// These steps deliberately avoid duplicating definitions that exist elsewhere
// (e.g. `I open the {string} page` in `common.steps.ts`, `I will login as {string}` in `login.steps.ts`,
// and `I will add the backpack to the cart` in `product.steps.ts`).

Then('I will open the cart', async () => {
  const purchasePage = getPurchasePage();
  await purchasePage.goToCart();
});

Then('I will click on Checkout', async () => {
  const purchasePage = getPurchasePage();
  await purchasePage.checkout();
});

Then('I will enter customer information {string} {string} {string}', async (first: string, last: string, zip: string) => {
  const purchasePage = getPurchasePage();
  await purchasePage.fillUserInfo(first, last, zip);
});

Then('I will click on Continue', async () => {
  const purchasePage = getPurchasePage();
  await purchasePage.continueCheckout();
});

Then('I will click on Finish', async () => {
  const purchasePage = getPurchasePage();
  await purchasePage.finishCheckout();
});

Then('I should see the confirmation message {string}', async (expectedText: string) => {
  const purchasePage = getPurchasePage();
  const actualText = await purchasePage.getConfirmationText();
  expect(actualText).toBe(expectedText);
});
