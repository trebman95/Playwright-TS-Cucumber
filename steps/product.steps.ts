import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort products by {string}', async (sortLabel: string) => {
  await new Product(getPage()).sortBy(sortLabel);
});


Then('all products should be sorted by price {string}', async (order: string) => {
  await new Product(getPage()).validateSortedByPrice(order);
});