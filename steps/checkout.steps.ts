import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Checkout } from '../pages/checkout.page';

Then('select the cart', async () => {
  await new Checkout(getPage()).goToCart();
});

Then('select Checkout', async () => {
  await new Checkout(getPage()).selectCheckout();
});

Then('fill in {string} {string} and {string}', async (firstName: string, lastName: string, postalCode: string) => {
  await new Checkout(getPage()).fillInDetails(firstName, lastName, postalCode);
});

Then('select Continue', async () => {
  await new Checkout(getPage()).selectContinue();
});

Then('select Finish', async () => {
  await new Checkout(getPage()).selectFinish();
});

Then('should see the confirmation text {string}', async (expectedText: string) => {
  await new Checkout(getPage()).validateConfirmationText(expectedText);
});
