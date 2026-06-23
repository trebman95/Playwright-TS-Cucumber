import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the items by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortItemsBy(sortOption);
});

Then('I should see all 6 items sorted by price {string}', async (direction: string) => {
  await new Product(getPage()).validatePricesSorted(direction as 'asc' | 'desc');
});