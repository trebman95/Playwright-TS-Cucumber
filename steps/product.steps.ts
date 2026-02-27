import { Then, defineParameterType } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { expect } from '@playwright/test';

// Define a parameter type that captures text with spaces and special characters
defineParameterType({
  name: 'sortOption',
  regexp: /[^"]*/,
  transformer: s => s.trim()
});

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort the items by {sortOption}', async (sortOption) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('I should see all items sorted correctly by {sortOption}', async (sortType) => {
  const isSorted = await new Product(getPage()).validatePricesSorted(sortType);
  expect(isSorted).toBe(true);
});