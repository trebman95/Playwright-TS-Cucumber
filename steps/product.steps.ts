import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { expect } from '@playwright/test';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort the products by {string}', async (sortLabel: string) => {
  await new Product(getPage()).selectSortOption(sortLabel);
});

Then('I will validate all products are sorted correctly by price for {string}', async (sortLabel: string) => {
  const product = new Product(getPage());
  const prices = await product.getProductPrices();

  if (prices.length < 2) {
    // nothing to validate
    return;
  }

  const label = sortLabel.toLowerCase();
  if (label.includes('low to high') || label.includes('low-to-high')) {
    // verify ascending: every next price >= previous
    console.log('Validating prices are sorted low to high: ', prices);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  } else {
    // verify descending: every next price <= previous
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  }
});