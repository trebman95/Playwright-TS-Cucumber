import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { expect } from '@playwright/test';

When('I select sort option {string}', async (sortOption: string) => {
  const page = getPage();
  await page.selectOption('.product_sort_container', { label: sortOption });
});

Then('I should see products sorted by {string}', async (sortOrder: string) => {
  const page = getPage();

  // Grab all prices from the DOM
  const productPrices = await page.$$eval('.inventory_item_price', els =>
    els.map(e => parseFloat(e.textContent!.replace('$','').trim()))
  );

  // Create a sorted copy depending on the order
  const sortedPrices = [...productPrices].sort((a, b) =>
    sortOrder === 'Price (low to high)' ? a - b : b - a
  );

  // Assert that the actual order matches the expected sorted order
  expect(productPrices).toEqual(sortedPrices);
});
  
