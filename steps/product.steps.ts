import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

When('I will navigate to the cart', async () => {
  await new Product(getPage()).clickOnCart();
});

Then('I will sort the items by {string}', async (sortOption) => {
  await new Product(getPage()).sortItemsByPrice(sortOption);
});

Then('I will validate all 6 items are sorted correctly by price {string}', async(sortOption) => {
  await new Product(getPage()).validateItemsAreSortedByPrice(sortOption);
});