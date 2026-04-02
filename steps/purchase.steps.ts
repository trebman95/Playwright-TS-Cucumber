import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I checkout with first name {string} last name {string} postal code {string}', async (firstName, lastName, postalCode) => {
  const purchase = new Purchase(getPage());
  await purchase.clickCheckout();
  await purchase.fillCheckoutInfo(firstName, lastName, postalCode);
});

Then('I continue the checkout', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I finish the checkout', async () => {
  await new Purchase(getPage()).finishCheckout();
});

Then('I should see the order confirmation {string}', async (expectedText) => {
  const text = await new Purchase(getPage()).getConfirmationText();

  if (text !== expectedText) {
    throw new Error(`Expected order confirmation to be "${expectedText}" but found "${text}"`);
  }
});
