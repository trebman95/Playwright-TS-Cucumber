import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then('I will add the backpack to the cart', async function () {
  const page = this.page;
  await page.waitForURL('**/inventory.html', {timeout : 30000});
  await page.waitForSelector('.inventory_item', {timeout: 30000});
  await page.click('[data-tets="add-to-cart-sauce-labs-backpack"]');
  await expect(page.locator('[data-tests="remove-sauce-labs-backpack"]')).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});