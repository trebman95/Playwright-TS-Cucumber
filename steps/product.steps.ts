import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

When('I select the sort option {string}', async (sortOption: string) => {
  await new Product(getPage()).selectSortOption(sortOption);
});

Then('the products should be sorted by price {string}', async (direction: string) => {
  if (direction !== 'ascending' && direction !== 'descending') {
    throw new Error('Sort direction must be either "ascending" or "descending"');
  }
  await new Product(getPage()).validatePriceSorting(direction);
});