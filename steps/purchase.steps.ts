import { Then, When, Given } from '@cucumber/cucumber';
import { page } from '../hooks/world';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

Given('I am on the inventory page', async function () {
  const inv = new InventoryPage(page);
  await inv.assertOnPage();
});

When('I add the product {string} to the cart', async function (name: string) {
  const inv = new InventoryPage(page);
  await inv.addToCart(name);
});

When('I go to the cart', async function () {
  const inv = new InventoryPage(page);
  await inv.openCart();
  const cart = new CartPage(page);
  await cart.assertOnPage();
});

When('I proceed to checkout', async function () {
  const cart = new CartPage(page);
  await cart.checkout();
  const info = new CheckoutInfoPage(page);
  await info.assertOnPage();
});

When('I enter checkout information:', async function (table) {
  const { firstName, lastName, postalCode } = table.hashes()[0];
  const info = new CheckoutInfoPage(page);
  await info.fillInfo(firstName, lastName, postalCode);
  const over = new CheckoutOverviewPage(page);
  await over.assertOnPage();
});

When('I finish checkout', async function () {
  const over = new CheckoutOverviewPage(page);
  await over.finish();
});

Then('I should see the order complete header {string}', async function (headerText: string) {
  const done = new CheckoutCompletePage(page);
  await done.assertCompleted(headerText);
});

Then('the order complete text should contain {string}', async function (snippet: string) {
  const done = new CheckoutCompletePage(page);
  await done.expectBodyContains(snippet);
});
