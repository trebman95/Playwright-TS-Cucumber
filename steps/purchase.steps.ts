import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Checkout } from '../pages/checkout.page';

Then('I open the cart', async () => {
  await new Checkout(getPage()).openCart();
});

Then('I checkout the product', async () => {
  await new Checkout(getPage()).checkout();
});

Then(
  'I enter checkout information {string} {string} {string}',
  async (first: string, last: string, zip: string) => {
    await new Checkout(getPage()).enterUserInfo(first, last, zip);
  }
);

Then('I finish the purchase', async () => {
  await new Checkout(getPage()).finishPurchase();
});

Then(
  'I should see the purchase confirmation text {string}',
  async (expected: string) => {
    await new Checkout(getPage()).validateConfirmation(expected);
  }
);