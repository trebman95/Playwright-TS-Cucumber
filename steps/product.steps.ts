import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the items by {string}', async (sortOption) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('I should see all 6 items sorted by price {string}', async (sortOption) => {
  const sorted = await new Product(getPage()).areItemsSortedByPrice(sortOption);
  if (!sorted) {
    throw new Error(`Items are not sorted correctly by ${sortOption}`);
  }
});