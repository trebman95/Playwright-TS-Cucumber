import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I select the cart', async () => {
  await new Purchase(getPage()).selectCart();
});

Then('I select Checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then(/^I fill in the First Name "(.*)", Last Name "(.*)", and Zip\/Postal Code "(.*)"$/, async (firstName, lastName, zip) => {
  await new Purchase(getPage()).fillInfo(firstName, lastName, zip);
});

Then('I select Continue', async () => {
  await new Purchase(getPage()).selectContinue();
});

Then('I select Finish', async () => {
  await new Purchase(getPage()).selectFinish();
});

Then('I validate the text {string}', async (expected) => {
  await new Purchase(getPage()).validateConfirmation(expected);
});
