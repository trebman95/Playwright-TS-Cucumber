import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

When(/^I will Sort the items by '(.*)'$/, async (sort) => {
  await new Product(getPage()).doSort(sort);
});

Then(/^I should see all 6 items sorted by price in "(.*)"$/, async (order) => {
  await new Product(getPage()).validatePriceSort(order);
});
