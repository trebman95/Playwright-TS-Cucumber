import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will select the link to the cart', async () => {
  await new Product(getPage()).selectCart();
});


Then('I will click checkout', async () => {
  await new Product(getPage()).selectCheckout();
});


Then('I will complete the checkout form', async () => {
  await new Product(getPage()).completeCheckoutForm();
});


Then('I will click continue', async () => {
  await new Product(getPage()).continueCheckout();
});

Then('I will click finish', async () => {
  await new Product(getPage()).finishCheckout();
});

Then ('I should see the order complete message {string}', async (expectedMessage) => {
  await new Product(getPage()).seeOrderCompleteStatus(expectedMessage)
})