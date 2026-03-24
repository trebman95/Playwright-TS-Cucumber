import { Then,When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { expect } from '@playwright/test';

Then('I will add the backpack to the cart', async () => {
  const page = getPage(); // ✅ always inside step
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
});
When('I sort products by {string}', async function (sortOption: string) {
  const page = getPage();

  if (sortOption === 'low to high') {
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
  } else if (sortOption === 'high to low') {
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');
  }
});

Then('prices should be sorted correctly', async function () {
  const page = getPage();

  const prices = await page.$$eval('.inventory_item_price', items =>
    items.map(item => Number((item.textContent || '').replace('$', '')))
  );

  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
});
Then('I proceed to checkout', async () => {
  const page = getPage();
  await page.click('.shopping_cart_link'); // go to cart
  await page.click('[data-test="checkout"]'); // checkout
});

Then(
  'I fill in checkout info with {string} {string} {string}',
  async (firstName: string, lastName: string, postalCode: string) => {
    const page = getPage();
    await page.fill('[data-test="firstName"]', firstName);
    await page.fill('[data-test="lastName"]', lastName);
    await page.fill('[data-test="postalCode"]', postalCode);
    await page.click('[data-test="continue"]');
  }
);

Then('I complete the purchase', async () => {
  const page = getPage();
  await page.click('[data-test="finish"]');
});

Then('I should see the success message {string}', async (expectedMessage: string) => {
  const page = getPage();
  const actualMessage = await page.textContent('.complete-header');
  expect(actualMessage).toContain(expectedMessage);
});