import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the products by {string}', async (sortOption) => {
  await new Product(getPage()).sortProducts(sortOption);
});

Then('I should see the products sorted by price {string}', async (sortOption) => {
  await new Product(getPage()).validatePriceSort(sortOption);
});

Then('I should see the products page title {string}', async (expectedTitle) => {
  await new Product(getPage()).validateProductsPageTitle(expectedTitle);
});
