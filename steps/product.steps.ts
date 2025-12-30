import { DataTable, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product, ProductPage } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the products by {string}', async (sortOption: string) => {
  await new ProductPage(getPage()).sortBy(sortOption);
});

Then(
  'all products should be sorted by price {string}',
  async (order: 'asc' | 'desc') => {
    await new ProductPage(getPage()).validateProductsSortedByPrice(order);
  }
);