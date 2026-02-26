import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort products by {string}', async (option: string) => {
  await new Product(getPage()).sortProducts(option);
});

Then('products should be sorted by price {string}', async (order: string) => {
  await new Product(getPage()).validatePriceSorting(order);
});

Then('cart count should be {string}', async (count: string) => {
  await new Product(getPage()).validateCartCount(count);
});