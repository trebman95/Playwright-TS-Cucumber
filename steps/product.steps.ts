import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

When('I add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

When('I navigate to the cart', async () => {
  await new Product(getPage()).goToCart();
});

When('I sort products by {string}', async (sortByLabel: string) => {
  await new Product(getPage()).selectSortByLabel(sortByLabel);
})

Then(
  'products are listed in this order {string}',
  async (expectedList: string) => {
    await new Product(getPage()).validateListOrder(expectedList);
  }
);