import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the products by {string}', async (sortOption) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('the products should be sorted by price {string}', async (order) => {
  await new Product(getPage()).validatePriceSort(order);
});

Then('I should see {int} products on the inventory page', async (count) => {
  await new Product(getPage()).validateInventoryPage(count);
});
