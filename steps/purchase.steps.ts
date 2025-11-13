import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I open the cart', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I select checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then('I enter the checkout information with first name {string}, last name {string}, and postal code {string}', async (firstName, lastName, postalCode) => {
  await new Purchase(getPage()).enterCheckoutInformation(firstName, lastName, postalCode);
});

Then('I continue to the overview', async () => {
  await new Purchase(getPage()).continueToOverview();
});

Then('I finish the purchase', async () => {
  await new Purchase(getPage()).finishPurchase();
});

Then('I should see the purchase confirmation message {string}', async (expectedMessage) => {
  await new Purchase(getPage()).validateConfirmationMessage(expectedMessage);
});

