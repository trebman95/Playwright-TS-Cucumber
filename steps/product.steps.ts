import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('sort the items by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('all items are sorted correctly by {string}', async (sortOption: string) => {
  await new Product(getPage()).validateSortedByPrice(sortOption);
});