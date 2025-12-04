import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort the items by {string}', async(sortOption) => {
  await new Product(getPage()).sortBy(sortOption);
})

Then('I will see all 6 items sorted correctly by {string}', async(sortOption) => {
  if (sortOption == 'lohi') {
    await new Product(getPage()).isSortedLoHi();
  } else {
    await new Product(getPage()).isSortedHiLo();
  }
})