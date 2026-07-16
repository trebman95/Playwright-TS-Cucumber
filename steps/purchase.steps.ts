import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I go to the cart', async () => {
  await new Purchase(getPage()).goToCart();
});

Then('I click checkout', async () => {
  await new Purchase(getPage()).clickCheckout();
});

Then('I fill in my details with first name {string} last name {string} and zip {string}', async (firstName: string, lastName: string, zip: string) => {
  await new Purchase(getPage()).fillInDetails(firstName, lastName, zip);
});

Then('I click continue', async () => {
  await new Purchase(getPage()).clickContinue();
});

Then('I click finish', async () => {
  await new Purchase(getPage()).clickFinish();
});

Then('I should see the confirmation message {string}', async (expectedMessage: string) => {
  await new Purchase(getPage()).validateConfirmationMessage(expectedMessage);
});
