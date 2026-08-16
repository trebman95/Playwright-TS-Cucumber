import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

When('I sort products by {string}', async (sortType: string) => {
  await new Product(getPage()).sortBy(sortType);
});

Then('all product prices should be sorted {string}', async (sortType: string) => {
  const product = new Product(getPage());
  const prices = await product.getPrices();
  const sorted = [...prices].sort((a, b) => (sortType.includes('low to high') ? a - b : b - a));
  expect(prices).toEqual(sorted);
});

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});
