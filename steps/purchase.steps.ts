import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

When('I select the cart and then click checkout', async () => {
  await new Purchase(getPage()).selectCartAndCheckout();
});

When('I fill in the First Name, Last Name, and Zip Code and click Continue', async () => {
  await new Purchase(getPage()).fillInShippingInformationAndClickContinue();
});

When('Then click Finish', async () => {
  await new Purchase(getPage()).selectFinish();
});

Then('I validate the text {string}', async (expectedText: string) => {
  await new Purchase(getPage()).validateCompleteText(expectedText);
});

Then('Get the price and click checkout', async () => {
  await new Purchase(getPage()).getPriceAndClickCheckout();
});

Then('Validate the price is same in checkout page', async () => {
  await new Purchase(getPage()).validatePriceInCheckout();
});
