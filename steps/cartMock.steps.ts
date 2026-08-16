import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';
import { Product } from '../pages/product.page';

When('I go directly to the cart page', async () => {
  await getPage().goto('https://www.saucedemo.com/cart.html');
});

When('I go directly to the inventory page', async () => {
  await getPage().goto('https://www.saucedemo.com/inventory.html');
});

Then('I should see {int} item(s) in the cart', async (count: number) => {
  const itemCount = await new Cart(getPage()).getItemCount();
  expect(itemCount).toBe(count);
});

Then('I should see the item {string} in the cart', async (name: string) => {
  const names = await new Cart(getPage()).getItemNames();
  expect(names).toContain(name);
});

Then('the cart icon should show {int} item(s)', async (count: number) => {
  const badgeCount = await new Product(getPage()).getCartBadgeCount();
  expect(badgeCount).toBe(count);
});
