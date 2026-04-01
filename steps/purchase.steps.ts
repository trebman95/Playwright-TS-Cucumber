import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will open the cart', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I will select Checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then('I will fill in the checkout info with {string}, {string}, and {string}', async (firstName, lastName, postal) => {
  await new Purchase(getPage()).fillCheckoutInfo(firstName, lastName, postal);
});

Then('I will select Continue', async () => {
  await new Purchase(getPage()).selectContinue();
});

Then('I will select Finish', async () => {
  await new Purchase(getPage()).selectFinish();
});

Then('I will validate the purchase message {string}', async (expectedMessage) => {
  await new Purchase(getPage()).validateThankYouText(expectedMessage);
});
