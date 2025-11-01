import { Then } from '@cucumber/cucumber';
import { getPage, delay } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
  await delay(1000);
});

Then('I sort products by {string}', async (sortType: string) => {
  await new Product(getPage()).sortProducts(sortType);
  await delay(1000);
});

Then('I should see all products sorted by {string}', async (sortType: string) => {
  await new Product(getPage()).validateProductsSorted(sortType);
  await delay(1000);
});

Then('I go to the cart', async () => {
  await new Product(getPage()).goToCart();
  await delay(1000);
});
