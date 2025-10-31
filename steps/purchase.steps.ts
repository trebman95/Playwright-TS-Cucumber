import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';


Then('I will select the cart', async () => {
  const purchase = new Purchase(getPage());
  await purchase.openCart();
});

Then('I will select checkout', async () => {
  await getPage().waitForLoadState('domcontentloaded');
});

Then('I will fill in the First Name, Last Name, and Zip\\/Postal Code', async () => {
  const purchase = new Purchase(getPage());
  
  await purchase.checkoutInformation('John', 'Doe', '12345');
});

Then('I will select continue', async () => {
  await getPage().waitForLoadState('domcontentloaded');
});

Then('I will select finish', async () => {
  const purchase = new Purchase(getPage());
  await purchase.completePurchase();
});

Then('I will validate the text {string}', async (expectedMessage) => {
  const purchase = new Purchase(getPage());
  await purchase.validatePurchaseMessage(expectedMessage);
});
