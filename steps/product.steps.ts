import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

//product sorting
Then('I apply sort option {string}', async (sortText: string) => {
  await new Product(getPage()).applySort(sortText);
});

Then('the product prices should be in {string} order', async (direction: 'asc' | 'desc') => {
  await new Product(getPage()).assertPricesAreSorted(direction);
});

//add to cart & checkout
Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackpack();
});


//added by Senia

Then('I open the shopping cart', async () => {
  await new CartPage(getPage()).open();
  await new CartPage(getPage()).open();
});

Then('I proceed to checkout', async () => {
  await new CartPage(getPage()).startCheckout();
});

Then('I enter checkout information: first name {string}, last name {string}, postal code {string}',
  async (firstName: string, lastName: string, postalCode: string) => {
    await new CheckoutPage(getPage()).fillCustomerInfo(firstName, lastName, postalCode);
});

Then('I continue to the checkout overview', async () => {
  await new CheckoutPage(getPage()).continue();
});

Then('I complete the purchase', async () => {
  await new CheckoutPage(getPage()).placeOrder();
});

Then('I should see the order confirmation message {string}', async (message: string) => {
  await new CheckoutPage(getPage()).assertOrderCompleted(message);
});

Then('I should see the checkout error message {string}', async (message: string) => {
  await new CheckoutPage(getPage()).assertCheckoutError(message);
});