import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { CheckoutStepOne } from '../pages/checkout-step-one.page';
import { CheckoutStepTwo } from '../pages/checkout-step-two.page';
import { CheckoutComplete } from '../pages/checkout-complete.page';

Then('I will fill in checkout information with {string}, {string}, and {string}', async (firstName, lastName, postalCode) => {
    await new CheckoutStepOne(getPage()).fillCheckoutInfo(firstName, lastName, postalCode);
});

Then('I will select continue', async () => {
    await new CheckoutStepOne(getPage()).clickContinue();
});

Then('I will select finish', async () => {
    await new CheckoutStepTwo(getPage()).clickFinish();
});

Then('I should see the item price {string}', async (expectedPrice) => {
    await new CheckoutStepTwo(getPage()).validateItemPrice(expectedPrice);
});

Then('I should see the tax {string}', async (expectedTax) => {
    await new CheckoutStepTwo(getPage()).validateTax(expectedTax);
});

Then('I should see the total matches price plus tax', async () => {
    await new CheckoutStepTwo(getPage()).validateTotal();
});

Then('I should see the order completion message {string}', async (expectedMessage) => {
    await new CheckoutComplete(getPage()).validateOrderCompletion(expectedMessage);
});
