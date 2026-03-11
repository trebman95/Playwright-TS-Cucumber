import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will go to my shopping cart', async () => {
  await new Product(getPage()).selectCart();
});

Then('I will sort by {string}, and the results should be {string}', async (sort: string, prices: string) => {
  await new Product(getPage()).selectDropdown(sort);
  await new Product(getPage()).sortItems(prices)
})
