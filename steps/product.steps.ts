import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('sort the items by {string}', async (sort: string) => {
  await new Product(getPage()).sortItems(sort);
})

Then('the items onscreen are sorted correctly according to {string}', async (sort: string) => {
  await new Product(getPage()).checkSort(sort);
})