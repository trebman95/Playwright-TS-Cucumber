import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will open the cart', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I will proceed to checkout', async () => {
  await new Purchase(getPage()).proceedToCheckout();
});

Then('I will fill checkout information with {string} {string} {string}', async (firstName, lastName, postalCode) => {
  await new Purchase(getPage()).fillCheckoutInformation(firstName, lastName, postalCode);
});

Then('I will continue checkout', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I will finish checkout', async () => {
  await new Purchase(getPage()).finishCheckout();
});

Then('I should see the successful purchase text {string}', async (expectedText) => {
  await new Purchase(getPage()).validateSuccessfulPurchaseText(expectedText);
});
