import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';
import { CheckoutStepOne } from '../pages/checkout.step-one.page';
import { CheckoutStepTwo } from '../pages/checkout.step-two.page';
import { CheckoutComplete } from '../pages/checkout.complete.page';


When('I select Checkout', async () => {
  await new Cart(getPage()).proceedToCheckout();
});

When('I select Continue', async () => {
  await new CheckoutStepOne(getPage()).continueCheckout();
});

When('I select Finish', async () => {
  await new CheckoutStepTwo(getPage()).finishCheckout();
});

Then('I should see the order success text {string}', async (expected: string) => {
  await new CheckoutComplete(getPage()).validateOrderSuccess(expected);
});
