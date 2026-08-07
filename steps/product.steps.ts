import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort items by {string}', { timeout: 60000 }, async (option) => {
  await new Product(getPage()).sortBy(option);
});

Then('I validate items are sorted by price {string}', async (order) => {
  const normalized = order.toLowerCase().includes('high to low') ? 'high' : 'low';
  await new Product(getPage()).validateSorted(normalized as 'low' | 'high');
});