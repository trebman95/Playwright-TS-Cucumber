import { Given, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { PurchasePage } from '../pages/purchase.page';	

Then('I checkout the cart', async () => {
  await new PurchasePage(getPage()).checkoutCart();
});

Then('I complete the checkout information', async () => {
  await new PurchasePage(getPage()).fillCheckoutInformation(
    'Roy',
    'Jackson',
    '28269'
  );
});

Then('I finish the purchase', async () => {
  await new PurchasePage(getPage()).finishPurchase();
});

Then(
  'I should see the purchase confirmation message {string}',
  async (expectedMessage: string) => {
    await new PurchasePage(getPage()).validatePurchaseCompleteMessage(
      expectedMessage
    );
  }
);