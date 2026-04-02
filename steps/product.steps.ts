import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I go to the cart', async () => {
  await new Product(getPage()).goToCart();
});

Then('I sort products by price {string}', async (sortOption) => {
  await new Product(getPage()).sortByPrice(sortOption);
});

Then('I should see the products sorted by price {string}', async (sortOption) => {
  const product = new Product(getPage());
  const prices = await product.getPrices();

  if (prices.length !== 6) {
    throw new Error(`Expected 6 products, but found ${prices.length}`);
  }

  const sorted = [...prices];
  sorted.sort((a, b) => a - b);

  if (sortOption === 'Price (high to low)') {
    sorted.reverse();
  }

  const match = sorted.every((value, index) => value === prices[index]);

  if (!match) {
    throw new Error(`Expected products to be sorted by ${sortOption}, but were ${prices}`);
  }
});
