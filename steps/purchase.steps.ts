import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';


Then('I select the cart', async () => {
  await new Purchase(getPage()).selectCart();
});

Then('I select Checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then('I fill in the checkout information', async () => {
  await new Purchase(getPage()).fillCheckoutInformation();
});

Then('I select Continue', async () => {
  await new Purchase(getPage()).selectContinue();
});

Then('I select Finish', async () => {
  await new Purchase(getPage()).selectFinish();
});

Then('I should see the success message {string}', async (expectedMessage) => {
  await new Purchase(getPage()).validateSuccessMessage(expectedMessage);
});