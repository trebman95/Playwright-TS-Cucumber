import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';
import { Checkout } from '../pages/checkout.page';

Then('I will open the cart', async () => {
  await new Cart(getPage()).openCart();
});

Then('I should see the product {string} in the cart', async (productName) => {
  await new Cart(getPage()).validateProductInCart(productName);
});

Then('I will proceed to checkout', async () => {
  await new Cart(getPage()).proceedToCheckout();
});

Then('I will fill in checkout information {string} {string} {string}', async (firstName, lastName, zip) => {
  await new Checkout(getPage()).fillInformation(firstName, lastName, zip);
});

Then('I will continue to overview', async () => {
  await new Checkout(getPage()).continueToOverview();
});

Then('I will finish the purchase', async () => {
  await new Checkout(getPage()).finishPurchase();
});

Then('I should see the purchase confirmation text {string}', async (expectedText) => {
  await new Checkout(getPage()).validateConfirmationText(expectedText);
});