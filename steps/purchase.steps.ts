import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will select the cart', async () => {
  await new Purchase(getPage()).selectCart();
});

Then('I will select checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then('I will fill in checkout information with first name {string}, last name {string}, and zip code {string}', async (firstName, lastName, zipCode) => {
  await new Purchase(getPage()).fillCheckoutInformation(firstName, lastName, zipCode);
});

Then('I will select continue', async () => {
  await new Purchase(getPage()).selectContinue();
});

Then('I will select finish', async () => {
  await new Purchase(getPage()).selectFinish();
});

Then('I should see confirmation text {string}', async (expectedMessage) => {
  await new Purchase(getPage()).validateConfirmationMessage(expectedMessage);
});
