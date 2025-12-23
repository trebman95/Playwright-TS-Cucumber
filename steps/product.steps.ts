import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the products by price {string}', async (sort: string) => {
  await new Product(getPage()).sortByPrice(sort);
});

Then('the products should be sorted by price {string}', async (sort: string) => {
  await new Product(getPage()).validateSortedByPrice(sort);
});

Then('I should see {int} products on the page', async (expectedCount: number) => {
  const product = new Product(getPage());
  const actualCount = await product.getProductCount();
  if (actualCount !== expectedCount) {
    throw new Error(`Expected ${expectedCount} products but found ${actualCount}`);
  }
});
