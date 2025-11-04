import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../hooks/world';
import { InventoryPage } from '../pages/InventoryPage';

When('I sort products by {string}', async function (option: string) {
  const inv = new InventoryPage(page);
  await inv.sortBy(option);
});

Then('product prices should be in {string} order', async function (order: 'asc'|'desc') {
  const inv = new InventoryPage(page);
  const prices = await inv.getPrices();

  const sorted = [...prices].sort((a,b) => a - b);
  const expected = order === 'asc' ? sorted : sorted.slice().reverse();

  expect(prices.length).toBeGreaterThan(0);
  expect(prices).toEqual(expected);
});
