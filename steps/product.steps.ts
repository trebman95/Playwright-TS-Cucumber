import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will open the cart', async () => {
  await new Product(getPage()).openCart();
});

Then('I will checkout', async () => {
  await new Product(getPage()).checkout();
});

Then('I will provide checkout information with first name {string}, last name {string}, and postal code {string}', async (firstName, lastName, postalCode) => {
  await new Product(getPage()).fillCheckoutInformation(firstName, lastName, postalCode);
});

Then('I will continue checkout', async () => {
  await new Product(getPage()).continueCheckout();
});

Then('I will finish checkout', async () => {
  await new Product(getPage()).finishCheckout();
});

Then('I should see the order confirmation {string}', async (expectedText) => {
  await new Product(getPage()).validateOrderConfirmation(expectedText);
});

Then('I will sort the products by {string}', async (sortLabel) => {
  await new Product(getPage()).sortBy(sortLabel);
});

Then('all {int} product prices should be sorted {string}', async (expectedCount, direction) => {
  await new Product(getPage()).validatePricesAreSorted(direction, expectedCount);
});

Then('the cart item count should be {int}', async (expectedCount) => {
  await new Product(getPage()).validateCartItemCount(expectedCount);
});
