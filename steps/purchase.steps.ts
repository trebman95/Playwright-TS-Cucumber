import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will open the cart', async () => {
    await new Purchase(getPage()).openCart();
});

Then('I will click checkout', async () => {
    await new Purchase(getPage()).clickCheckout();
});

Then('I will enter the checkout information', async () => {
    await new Purchase(getPage()).enterCheckoutInformation();
});

Then('I will click continue', async () => {
    await new Purchase(getPage()).clickContinue();
});

Then('I will click finish', async () => {
    await new Purchase(getPage()).clickFinish();
});

Then('I should see the purchase message {string}', async (expectedMessage) => {
    await new Purchase(getPage()).validatePurchaseMessage(expectedMessage);
});