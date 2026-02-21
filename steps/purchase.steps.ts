import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will select the cart', async () => {
  await new Purchase(getPage()).selectCart();
});

Then('I will select checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then('I will fill in checkout info with first name {string} last name {string} and zip {string}', async (firstName, lastName, zip) => {
  await new Purchase(getPage()).fillCheckoutInfo(firstName, lastName, zip);
});

Then('I will select continue', async () => {
  await new Purchase(getPage()).selectContinue();
});

Then('I will select finish', async () => {
  await new Purchase(getPage()).selectFinish();
});

Then('I should see the order confirmation text {string}', async (expectedText) => {
  await new Purchase(getPage()).validateConfirmationText(expectedText);
});
