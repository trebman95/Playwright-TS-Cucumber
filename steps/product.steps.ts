import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Product } from '../pages/product.page';
import { getPage } from '../playwrightUtilities';

When('I sort products by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortProducts(sortOption);
});

Then('the products should be sorted {string}', async (order: string) => {
  const product = new Product(getPage());
  const prices = await product.getProductPrices();

  const sortedPrices = [...prices].sort((a, b) =>
    order === 'ascending' ? a - b : b - a
  );

  expect(prices).toEqual(sortedPrices);
});
