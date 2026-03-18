import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';

When('I will select checkout', async () => {
    await new Cart(getPage()).clickOnCheckout();
})

Then('I will fill First Name {string}, Last Name {string}, and Postal code {string}', async (firstName, lastName, postalCode) => {
    await new Cart(getPage()).fillPersonalDetails(firstName, lastName, postalCode);
})

When('I will select continue', async () => {
    await new Cart(getPage()).clickOnContinue();
})

When('I will select finish', async () => {
    await new Cart(getPage()).clickOnFinish();
})

Then('I should see the success message {string}', async (exp_message) => {
    await new Cart(getPage()).validateThankYouMessage(exp_message);
})