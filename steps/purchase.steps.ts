import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I go to the cart', async () => {
  await new Purchase(getPage()).goToCart();
});

Then('I checkout', async () => {
  await new Purchase(getPage()).checkout();
});

Then('I fill in the checkout information with first name {string}, last name {string}, and postal code {string}', async (firstName, lastName, postalCode) => {
  await new Purchase(getPage()).fillCheckoutInfo(firstName, lastName, postalCode);
});

Then('I continue to the overview', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I finish the checkout', async () => {
  await new Purchase(getPage()).finish();
});

Then('I should see the text {string}', async (expectedText) => {
  await new Purchase(getPage()).validateCompleteHeader(expectedText);
});

Then('I should see the checkout error {string}', async (expectedError) => {
  await new Purchase(getPage()).validateCheckoutError(expectedError);
});
