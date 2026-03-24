import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});


Then('I sort products by {string}', async (sortOption) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('products should be sorted {string}', async (order) => {
  await new Product(getPage()).validateSorted(order);
});