import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';

Then('I will proceed to checkout', async () => {
  const page = getPage();
  // open cart
  await page.click('[data-test="shopping-cart-link"]');
  // start checkout
  await page.click('[data-test="checkout"]');
  // fill checkout details
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');
  // complete purchase
  await page.click('[data-test="finish"]');
});

Then('I should see purchase confirmation {string}', async (confirmationText) => {
  const page = getPage();
  const confirmation = page.locator('.complete-header, [data-test="complete-header"]');
  await confirmation.waitFor({ state: 'visible' });
  await expect(confirmation).toHaveText(confirmationText);
});

