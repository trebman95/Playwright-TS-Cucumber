import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

When('I add the backpack to the cart', async () => {
  const page = getPage();
  const product = new Product(page);
  await product.addBackPackToCart();
});

When('I open the shopping cart', async () => {
  const page = getPage();
  const product = new Product(page);
  await product.openCart();
});

When('I proceed to checkout', async () => {
  const page = getPage();
  const product = new Product(page);
  await product.proceedToCheckout();
});

When('I fill in checkout information:', async (dataTable) => {
  const page = getPage();
  const product = new Product(page);
  const data = dataTable.rowsHash();
  await product.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
});

When('I continue to the overview page', async () => {
  const page = getPage();
  const product = new Product(page);
  await product.continueToOverview();
});

When('I finish the purchase', async () => {
  const page = getPage();
  const product = new Product(page);
  await product.finishPurchase();
});

Then('I should see the confirmation message {string}', async (expectedText: string) => {
  const page = getPage();
  const product = new Product(page);
  await product.validateConfirmationMessage(expectedText);
});