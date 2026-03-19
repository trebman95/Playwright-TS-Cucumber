import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will select the link to the cart', async () => {
  await new Product(getPage()).selectCart();
});

Then('I will sort items by {string}', async (sort: string) => {
  await new Product(getPage()).sortByPrice(sort);
});

Then('the items should be sorted by price {string}', async (sort: string) => {
  await new Product(getPage()).validatePriceSorting(sort);
});