import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { Checkout } from '../pages/checkout.page';

Then('I click on the shopping cart icon', async () => {
  await new Product(getPage()).clickCartIcon();
});

Then('I click on the Checkout button', async () => {
  await new Checkout(getPage()).clickCheckout();
});

Then('I enter checkout information {string} {string} {string}', async (first, last, zip) => {
  await new Checkout(getPage()).enterInfo(first, last, zip);
});

Then('I click on Continue', async () => {
  await new Checkout(getPage()).clickContinue();
});

Then('I click on Finish', async () => {
  await new Checkout(getPage()).clickFinish();
});

Then('I should see the confirmation message {string}', async (expectedMessage: string) => {
  const message = await new Checkout(getPage()).getConfirmationMessage();
  expect(message?.trim()).toBe(expectedMessage);
});
