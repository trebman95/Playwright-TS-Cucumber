import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { purchase } from '../pages/purchase.page';

Then('I will add the backpack to the cart', async () => {
  await new purchase(getPage()).addBackPackToCart();
});

Then('I will select the cart', async () => {
  await new purchase(getPage()).selectCart();
});

Then('I will select checkout', async () => {
  await new purchase(getPage()).selectCheckout();
});

Then('I will fill in the first name {string},{string}, and postal code {string}', async (firstName: string, lastName: string, postalCode: string) => {
    await new purchase(getPage()).fillUserInfo(firstName, lastName, postalCode);
}
);

Then('I will select continue', async () => {
  await new purchase(getPage()).selectContinue();
});

Then('I will select finish', async () => {
  await new purchase(getPage()).selectFinish();
});

Then('I should see the confirmation message {string}', async (expectedMessage: string) => {
  await new purchase(getPage()).validateConfirmationMessage(expectedMessage);
});
