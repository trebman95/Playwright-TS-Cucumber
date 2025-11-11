import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { Cart } from '../pages/cart.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will open the cart', async () => {
  await new Product(getPage()).clickShoppingCart();
});

Then('I will select checkout', async () => {
  await new Cart(getPage()).clickCheckout();
});

Then('I will sort the products by {string}', async (sortOption) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('I should validate all products are sorted by {string}', async (sortOption) => {
  if (sortOption.includes('high to low')) {
    await new Product(getPage()).validatePricesSortedHighToLow();
  } else if (sortOption.includes('low to high')) {
    await new Product(getPage()).validatePricesSortedLowToHigh();
  }
});