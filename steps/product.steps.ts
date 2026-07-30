import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will click on shopping cart', async () => {
  await new Product(getPage()).clickShoppingCart();
})

Then('I will click checkout', async () => {
  await new Product(getPage()).clickCheckout();
})

Then('I click on filter and choose {string} and {string}', async (sortOption, expectedOrder) => {
  await new Product(getPage()).selectFilterOption(sortOption, expectedOrder)
})

Then('I validate item order', async () => {
  await new Product(getPage()).validateItemOrder()
})