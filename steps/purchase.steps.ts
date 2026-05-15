import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I select the cart', async () => {
  await new Purchase(getPage()).selectCart();
  console.log('Selected the cart');
});

Then('I select checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
  console.log('Selected checkout');
});

Then('I fill in the checkout information', async () => {
  await new Purchase(getPage()).fillCheckoutInfo('John', 'Doe', '12345');
  console.log('Filled in checkout information');
});

Then('I select continue', async () => {
  await new Purchase(getPage()).selectContinue();
  console.log('Selected continue');
});

Then('I select finish', async () => {
  await new Purchase(getPage()).selectFinish();
  console.log('Selected finish');
});

Then('I should see the purchase confirmation {string}', async (expectedText: string) => {
  await new Purchase(getPage()).validatePurchaseConfirmation(expectedText);
  console.log(`Validated purchase confirmation: ${expectedText}`);
});