import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Checkout } from '../pages/checkout.page';
import { Product } from '../pages/product.page';

Then('I select the Cart', async () => {
  await new Checkout(getPage()).openCart();
});

Then('I select Checkout', async () => {
  await new Checkout(getPage()).clickCheckout();
});

Then('I will add the backpack to the cart', async () => {
  const product = new Product(getPage());
  await product.addBackPackToCart();
});

Then('I fill in the First Name {string}, Last Name {string}, and Zip {string}', async (firstName: string, lastName: string, zip:string) => {
  await new Checkout(getPage()).fillInfo(firstName, lastName, zip);
});

Then('I select Continue', async () => {
  await new Checkout(getPage()).clickContinue();
});

Then('I select Finish', async () => {
  await new Checkout(getPage()).clickFinish();
});

Then('I should see the text {string}', async (expected: string) => {
  await new Checkout(getPage()).expectSuccess(expected);
});