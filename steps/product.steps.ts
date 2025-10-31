import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I sort products by {string}', async (label: string) => {
 const page = getPage();
  await page.waitForURL('**/inventory.html', { timeout: 30000 });
    const product = new Product(getPage());
  await product.sortBy(label);               
});

Then('I should see products sorted by {string}', async (label: string) => {
  const product = new Product(getPage());
  if (label === 'Price (low to high)') {
    await product.expectPricesSortedLowHigh();
  } else if (label === 'Price (high to low)') {
    await product.expectPricesSortedHighLow();
  }
});
