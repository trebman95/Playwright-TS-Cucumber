import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { expect } from '@playwright/test';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort items by {string}', async (sortOption) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('products should be sorted {string}', async (order) => {
  const prices = await new Product(getPage()).getAllPrices();

  const sorted = [...prices].sort((a, b) =>
    order === 'ascending' ? a - b : b - a
  );

  expect(prices).toEqual(sorted);
});
