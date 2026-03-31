import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';


Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});
Then('I Select the cart top-right', async () => {
  await new Product(getPage()).selectCart();
});
Then('I select checkout', async () => {
  await new Product(getPage()).selectCheckout();
});
Then('I Fill in the First Name {string}, Last Name {string}, and ZipPostal Code {string}', async (firstName, lastName, zipCode) => {
  await new Product(getPage()).fillInfo(firstName, lastName, zipCode);
});
Then('I select Continue', async () => {
  await new Product(getPage()).selectContinue();
});
Then('I select Finish', async () => {
  await new Product(getPage()).selectFinish();
});
Then('I Validate the text {string}', async (expectedThankYouMessage: string) => {
  await new Product(getPage()).confirmMessage(expectedThankYouMessage);
});
