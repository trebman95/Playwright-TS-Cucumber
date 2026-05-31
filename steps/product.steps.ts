import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { expect } from '@playwright/test';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort products by {string}', async (sort: string) => {
  await new Product(getPage()).sortProducts(sort);
});

Then('products should be sorted correctly by {string}', async (sort: string) => {
  const product = new Product(getPage());
  const prices = await product.getPricesofProducts();

  const sortedPrices = [...prices].sort((a, b) => sort === 'Price (low to high)' ? a - b : b-a);

  expect(prices).toEqual(sortedPrices);

});
