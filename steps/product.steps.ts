import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I select sort order {string}', async (sortOrder: string) => {
  await new Product(getPage()).selectSortOrder(sortOrder);
});

Then('I capture all product prices', async () => {
  const productPage = new Product(getPage());
  const prices = await productPage.getAllProductPrices();
  // Store prices in the scenario context for later verification
  (global as any).capturedPrices = prices;
});

Then('I verify products are sorted by price {string}', async (sortOrder: string) => {
  const capturedPrices: number[] = (global as any).capturedPrices;
  const sortedPrices = [...capturedPrices].sort((a, b) => a - b); // Ascending sort
  if (sortOrder === 'Price (high to low)') {
    sortedPrices.reverse(); // Descending sort
  }
  for (let i = 0; i < capturedPrices.length; i++) {
    if (capturedPrices[i] !== sortedPrices[i]) {
      throw new Error(`Products are not sorted correctly by ${sortOrder}. Expected ${sortedPrices} but found ${capturedPrices}`);
    }
  }
});  