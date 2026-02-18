import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I select the cart from top right', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I select Checkout', async () => {
  await new Purchase(getPage()).checkout();
});

Then(
  'I fill in First Name {string}, Last Name {string}, and ZipCode {string}',
  async (firstName: string, lastName: string, zipCode: string) => {
    await new Purchase(getPage()).fillCheckoutInfo(firstName, lastName, zipCode);
  }
);

Then('I select Continue', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I select Finish', async () => {
  await new Purchase(getPage()).finishCheckout();
});

Then('I should see the purchase confirmation {string}', async (expectedText: string) => {
  await new Purchase(getPage()).validateConfirmation(expectedText);
});