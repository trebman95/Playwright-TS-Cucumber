import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

When('I sort the items by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortItemsBy(sortOption);
});

Then('I should see exactly {int} items', async (expectedCount: number) => {
  const count = await new Product(getPage()).countItems();
  if (count !== expectedCount) {
    throw new Error(`Expected ${expectedCount} items but found ${count}`);
  }
});

Then('all items should be sorted by price {string}', async (direction: 'ascending' | 'descending') => {
  await new Product(getPage()).validateItemsSortedByPrice(direction);
});