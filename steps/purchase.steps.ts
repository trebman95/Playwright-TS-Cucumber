import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I open the cart', async () => {
  await new Purchase(getPage()).openCart();
});

Then('I checkout the product', async () => {
  await new Purchase(getPage()).checkout();
});

Then(
  'I enter checkout details {string} {string} {string}',
  async (firstName, lastName, zip) => {
    await new Purchase(getPage()).enterDetails(firstName, lastName, zip);
  }
);

Then('I continue checkout', async () => {
  await new Purchase(getPage()).continue();
});

Then('I finish the purchase', async () => {
  const purchase = new Purchase(getPage());
  await purchase.continue();
  await purchase.finish();
});

Then('I should see confirmation message {string}', async (expected) => {
  await new Purchase(getPage()).validateSuccessMessage(expected);
});