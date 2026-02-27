import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});


Then(/^I sort the items by (.+)$/, async (sortType: string) => {
  await new Product(getPage()).sortItemsBy(sortType);
});

Then(
  /^I should see all items sorted correctly by price in (.+) order$/,
  async (sortType: string) => {
    await new Product(getPage()).validateItemsSorted(sortType);
  }
);
