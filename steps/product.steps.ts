import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';



When('I sort products by {string}', async (sortOption: string) => {
  const product = new Product(getPage());
  await product.sortProducts(sortOption);
});

Then('the products should be sorted in {string}', async (order: string) => {
  const product = new Product(getPage());
  const prices = await product.getAllProductPrices();
  const sorted = [...prices].sort((a, b) => order === 'ascending' ? a - b : b - a);
  expect(prices).toEqual(sorted);
});

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});