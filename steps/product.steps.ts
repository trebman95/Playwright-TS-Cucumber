import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort products by {string}', async (sortOption) => {
  await new Product(getPage()).sortProducts(sortOption);
});

Then('I should see all products sorted by {string}', async (sortOption) => {
  if (sortOption.includes('Price')) {
    await new Product(getPage()).validateProductsSortedByPrice(sortOption);
  } else if (sortOption.includes('Name')) {
    await new Product(getPage()).validateProductsSortedByName(sortOption);
  }
});

Then('I will add product {string} to the cart', async (productName) => {
  await new Product(getPage()).addProductToCart(productName);
});

Then('I will remove product {string} from the cart', async (productName) => {
  await new Product(getPage()).removeProductFromCart(productName);
});

Then('the cart badge should show {string}', async (expectedCount) => {
  await new Product(getPage()).validateCartBadgeCount(expectedCount);
});