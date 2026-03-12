import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I open the cart', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I start the checkout', async () => {
  await new Purchase(getPage()).startCheckout();
});

Then(
  'I fill the checkout form with first name {string}, last name {string}, and zip code {string}',
  async (firstName, lastName, zipCode) => {
    await new Purchase(getPage()).fillCheckoutInformation(firstName, lastName, zipCode);
  }
);

Then('I continue the checkout', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I finish the checkout', async () => {
  await new Purchase(getPage()).finishCheckout();
});

Then('I should see the purchase confirmation text {string}', async (expectedText) => {
  await new Purchase(getPage()).validatePurchaseConfirmationText(expectedText);
});
