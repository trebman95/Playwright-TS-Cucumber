import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will select the cart', async () => {
    await new Purchase(getPage()).clickOnCart();
});

Then('I will select checkout', async () => {
    await new Purchase(getPage()).clickCheckout();
});

Then('I will enter checkout details', async () => {
    await new Purchase(getPage()).enterUserDetails('Bob', 'Rivers', '24680');
});

Then('I will select continue', async () => {
    await new Purchase(getPage()).clickContinue()
});

Then('I will select finish', async () => {
    await new Purchase(getPage()).clickFinish();
});

Then('I will see a confirmation message {string}', async (message: string) => {
    await new Purchase(getPage()).verifyOrderConfirmationMessage(message);
});




