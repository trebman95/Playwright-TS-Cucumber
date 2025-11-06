import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';
import { expect } from '@playwright/test';

Then('I will open the cart', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I will select Checkout', async () => {
  await new Purchase(getPage()).clickCheckout();
});

// Use a regex to exactly match the quoted form used in the feature (handles the slash in 'Zip/Postal')
Then(/^I will fill in the First Name "([^"]+)", Last Name "([^"]+)" and Zip\/Postal Code "([^"]+)"$/, async (first: string, last: string, zip: string) => {
  await new Purchase(getPage()).fillCheckoutInfo(first, last, zip);
});

Then('I will select Continue', async () => {
  await new Purchase(getPage()).clickContinue();
});

Then('I will select Finish', async () => {
  await new Purchase(getPage()).clickFinish();
});

Then('I will validate the purchase success text', async () => {
  const purchase = new Purchase(getPage());
  const text = await purchase.getSuccessText();
  // normalize to be resilient to case/punctuation differences on the page
  expect(text.toLowerCase()).toContain('thank you');
});
