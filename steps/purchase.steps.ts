import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will add the backpack to the cart', async () => {
  await new Purchase(getPage()).addBackPackToCart();
});

Then('I will open the cart', async () => {
    await new Purchase(getPage()).openCart();
});

Then('I will select Checkout', async () => {
    await new Purchase(getPage()).clickCheckout();
});

Then('I will fill checkout form with {string} {string} {string}', async (firstName: string, lastName: string, postalCode: string) => {
    await new Purchase(getPage()).fillDetails(firstName, lastName, postalCode);
});

Then('I will select Continue', async () => {
    await new Purchase(getPage()).clickContinue();
});

Then('I will select Finish', async () => {
    await new Purchase(getPage()).clickFinish();
});

Then('I should see the text {string}', async (message: string) => {
    await new Purchase(getPage()).verifyThankYouMessage(message);
});

