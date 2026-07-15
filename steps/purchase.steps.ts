import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will open the cart', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I will checkout', async () => {
  await new Purchase(getPage()).checkout();
});

Then('I will fill checkout details with {string} {string} {string}', async (firstName: string, lastName: string, postalCode: string) => {
  await new Purchase(getPage()).fillCheckoutDetails(firstName, lastName, postalCode);
});

Then('I will continue checkout', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I will finish checkout', async () => {
  await new Purchase(getPage()).finishCheckout();
});

Then('I should see the purchase confirmation {string}', async (expectedText: string) => {
  await new Purchase(getPage()).validateConfirmation(expectedText);
});
