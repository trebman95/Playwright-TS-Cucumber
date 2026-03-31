import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { expect } from '@playwright/test';
import { getPage } from "../playwrightUtilities";
import { Product } from '../pages/product.page';

Given('I open the {string} page', async (url) => {
    await getPage().goto(url);
  });

 When('I sort the items by {string}', async (sortOption: string) => {
  await new Product(getPage()).selectSortDropDown(sortOption);
});

Then('I validate all 6 items are sorted {string}', async (order: string) => {
  const productPage = new Product(getPage());
  const prices = await productPage.getAllPrices();

  expect(prices.length).toBe(6);

  const sorted = [...prices];
  if (order === 'ascending') sorted.sort((a, b) => a - b);
  else sorted.sort((a, b) => b - a);

  expect(prices).toEqual(sorted);
}); 