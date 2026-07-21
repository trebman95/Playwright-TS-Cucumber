import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will click the cart icon', async () => {
  await new Purchase(getPage()).goToCartPage();
});

Then('I will click Checkout', async () => {
  await new Purchase(getPage()).clickCheckout();
});

Then(
  'I will fill in first name as {string}, last name as {string}, and zip code as {string}',
  async (firstName: string, lastName: string, zip: string) => {
    await new Purchase(getPage()).fillCheckoutForm(firstName, lastName, zip)
  }
)

Then('I will click Continue', async () => {
  await new Purchase(getPage()).clickContinue();
});

Then('I will click Finish', async () => {
  await new Purchase(getPage()).clickFinish();
});

Then('I should see the confirmation message {string}', async (expectedMessage: string) => {
  await new Purchase(getPage()).validateConfirmationMessage(expectedMessage);
});