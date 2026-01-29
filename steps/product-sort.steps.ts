import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';

Then('I sort products by {string}', async (sortOption) => {
  await getPage()
    .locator('select[data-test="product-sort-container"]')
    .selectOption({ label: sortOption });
});

Then('I validate products are sorted {string}', async (direction) => {
  const prices = await getPage().locator('.inventory_item_price').allTextContents();

  const numericPrices = prices.map(p =>
    parseFloat(p.replace('$', '').trim())
  );

  const sorted = [...numericPrices].sort((a, b) => a - b);
  if (direction === 'descending') sorted.reverse();

  if (JSON.stringify(numericPrices) !== JSON.stringify(sorted)) {
    throw new Error(`Prices not sorted ${direction}. Actual: ${numericPrices}`);
  }
});
