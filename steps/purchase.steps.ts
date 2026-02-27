import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';
import { expect } from '@playwright/test';

Then('I will select the cart', async () => {
  await new Purchase(getPage()).selectCart();
});

Then('I will select checkout', async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then('I will fill the checkout information with {string}, {string}, and {string}', async (firstName, lastName, zipCode) => {
  await new Purchase(getPage()).fillCheckoutInfo(firstName, lastName, zipCode);
});

Then('I will select continue', async () => {
  await new Purchase(getPage()).selectContinue();
});

Then('I will select finish', async () => {
  await new Purchase(getPage()).selectFinish();
});

Then('I should see the confirmation message {string}', async (expectedMessage) => {
  const confirmationText = await new Purchase(getPage()).getOrderConfirmationText();
  expect(confirmationText).toContain(expectedMessage);
});
