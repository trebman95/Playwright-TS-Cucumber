import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';


Then('I will click checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});


Then('I will complete the checkout form', async () => {
  await new Purchase(getPage()).completeCheckoutForm();
});


Then('I will click continue', async () => {
  await new Purchase(getPage()).continueCheckout();
});

Then('I will click finish', async () => {
  await new Purchase(getPage()).finishCheckout();
});

Then ('I should see the order complete message {string}', async (expectedMessage) => {
  await new Purchase(getPage()).seeOrderCompleteStatus(expectedMessage)
})