import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then(/^I select the cart \(top-right\)$/, async () => {
  await new Purchase(getPage()).goToCart();
});

//Then('I select the cart (top-right)', async () => { ... })


Then('I select Checkout', async () => {
  await new Purchase(getPage()).clickCheckout();
});

Then(
  'I fill checkout information First Name {string} Last Name {string} Zip {string}',
  async (firstName, lastName, zip) => {
    await new Purchase(getPage()).fillCheckoutInfo(firstName, lastName, zip);
  }
);

Then('I select Continue', async () => {
  await new Purchase(getPage()).clickContinue();
});

Then('I select Finish', async () => {
  await new Purchase(getPage()).clickFinish();
});

Then('I validate the purchase complete text {string}', async (expectedText) => {
  await new Purchase(getPage()).validateThankYou(expectedText);
});

Then('I remove the backpack from the cart', async () => {
  await new Purchase(getPage()).removeBackpackFromCart();
});

Then('the cart should be empty', async () => {
  await new Purchase(getPage()).validateCartIsEmpty();
});
