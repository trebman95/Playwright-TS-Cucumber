import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { Cart } from '../pages/cart.page';
import { Checkout } from '../pages/checkout.page';
import { PurchasePage } from '../pages/purchase.page';



Then('I select the cart', async () => {
  await new Cart(getPage()).goToCart();
});

Then('I select Checkout', async () => {
  await new Cart(getPage()).checkout();
});

Then('I fill in the First Name {string}, Last Name {string}, and Zip\\/Postal Code {string}', async function (string, string2, string3) {
await new PurchasePage(getPage()).fillCheckoutForm(string, string2, string3);
         });

Then('I select Continue', async () => {
  await new Checkout(getPage()).continue();
});

Then('I select Finish', async () => {
  await new Checkout(getPage()).finish();
});

Then('I should see the text {string}', async (expectedText) => {
  const page = getPage();
  const confirmationSelector = '.complete-header'; // Adjust if needed
  await page.waitForSelector(confirmationSelector, { state: 'visible' });
  const actualText = await page.textContent(confirmationSelector);
  if (actualText?.trim() !== expectedText) {
    throw new Error(
      `Expected confirmation text "${expectedText}", but got "${actualText}"`
    );
  }
});