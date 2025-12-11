import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will select the cart', async () => {
    await new Purchase(getPage()).selectCart();
  });

Then('I will select checkout', async () => {
    await new Purchase(getPage()).selectCheckout();
  });

Then('I will fill in first name {string} and last name {string}', async (firstName, lastName) => {
    await new Purchase(getPage()).fillNames(firstName, lastName);
  });

Then('I will fill in zip code {string}', async (zipCode) => {
    await new Purchase(getPage()).fillZip(zipCode);
  });

Then('I will select continue', async () => {
    await new Purchase(getPage()).selectContinue();
  });

Then('I will select finish', async () => {
    await new Purchase(getPage()).selectFinish();
  });

Then('I should see {string}', async (thankYou) => {
    await new Purchase(getPage()).validateThankYou(thankYou);
  });
