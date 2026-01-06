import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/Purchase.page';
import { Product } from '../pages/product.page';

Then('I click on the cart', async () => {
  await new Product(getPage()).clickCart();
});

Then('I proceed to checkout', async () => {
  await new Purchase(getPage()).proceedToCheckout();
});

Then(
  'I complete the purchase with first name {string}, last name {string}, and postal code {string}',
  async (firstName, lastName, postalCode) => {
    await new Purchase(getPage()).completePurchase(firstName, lastName, postalCode);
  }
);

Then('I click Continue', async () => {
  await new Purchase(getPage()).clickContinue();
});

Then('I click Finish', async () => {
  await new Purchase(getPage()).clickFinish();
});

Then('I should see the successful purchase message {string}', async (expectedMessage) => {
  await new Purchase(getPage()).validateSuccessMessage(expectedMessage);
});