import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort the products by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortProductsByOption(sortOption);
});

Then('I should see the products sorted by {string}', async (sortOption: string) => {
  await new Product(getPage()).validateProductsSorted(sortOption);
});