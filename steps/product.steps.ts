import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort products by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortByPrice(sortOption);
});

Then('I should see all items sorted by {string}', async (order) => {
  await new Product(getPage()).validateSortedByPrice(order as 'asc' | 'desc');
});
