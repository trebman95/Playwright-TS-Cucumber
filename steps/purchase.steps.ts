import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { expect } from '@playwright/test';

Then('I open the cart', async () => {
  await new Product(getPage()).openCart();
});

Then('I proceed to checkout', async () => {
  await new Product(getPage()).clickCheckout();
});

Then('I enter checkout details {string} {string} {string}', async (fname, lname, zip) => {
  await new Product(getPage()).fillCheckoutDetails(fname, lname, zip);
});

Then('I continue checkout', async () => {
  await new Product(getPage()).clickContinue();
});

Then('I finish checkout', async () => {
  await new Product(getPage()).clickFinish();
});

Then('I should see text {string}', async (text) => {
  const successText = await new Product(getPage()).getSuccessText();
  await expect(successText).toHaveText(text);
});
