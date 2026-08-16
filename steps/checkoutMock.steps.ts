import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';
import { Checkout } from '../pages/checkout.page';

When('I go directly to the checkout overview page', async () => {
  await getPage().goto('https://www.saucedemo.com/checkout-step-two.html');
});

When('I go directly to the checkout complete page', async () => {
  await getPage().goto('https://www.saucedemo.com/checkout-complete.html');
});

Then('I should see {int} item in the checkout overview', async (count: number) => {
  const names = await new Checkout(getPage()).getOverviewItemNames();
  expect(names.length).toBe(count);
});

Then('I should see the item {string} in the checkout overview', async (name: string) => {
  const names = await new Checkout(getPage()).getOverviewItemNames();
  expect(names).toContain(name);
});

Then('the checkout overview subtotal should be {string}', async (expected: string) => {
  const subtotal = await new Checkout(getPage()).getOverviewSubtotal();
  expect(subtotal?.trim()).toBe(expected);
});

Then('the checkout overview tax should be {string}', async (expected: string) => {
  const tax = await new Checkout(getPage()).getOverviewTax();
  expect(tax?.trim()).toBe(expected);
});

Then('the checkout overview total should be {string}', async (expected: string) => {
  const total = await new Checkout(getPage()).getOverviewTotal();
  expect(total?.trim()).toBe(expected);
});
