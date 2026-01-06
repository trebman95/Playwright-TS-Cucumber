import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});
Then('I should see {int} item(s) in the cart', async (expectedCount) => {
  await new Product(getPage()).validateCartCount(expectedCount);
});


Then('I sort the items by {string}', async (sortOption) => {
  await new Product(getPage()).sortItems(sortOption);
});

Then('I should see all {int} items sorted correctly by price {string}', async (totalItems, sortOrder) => {
  await new Product(getPage()).validatePriceSorting(totalItems, sortOrder);
});
