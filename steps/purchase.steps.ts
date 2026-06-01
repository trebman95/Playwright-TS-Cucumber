import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

When('I go to the cart', async () => {
    await new Purchase(getPage()).goToCart();
});

When('I proceed to checkout', async () => {
    await new Purchase(getPage()).goToCheckout();
});

When('I enter checkout details {string} {string} {string}', async (firstName: string, lastName: string, zip: string) => {
    await new Purchase(getPage()).fillCheckoutForm(firstName, lastName, zip);
});

When('I continue to the order summary', async () => {
    await new Purchase(getPage()).continueCheckout();
});

When('I place the order', async () => {
    await new Purchase(getPage()).finishCheckout();
});

Then('I should see the order confirmation {string}', async (expectedMessage: string) => {
    await new Purchase(getPage()).validateSuccessMessage(expectedMessage);
});
