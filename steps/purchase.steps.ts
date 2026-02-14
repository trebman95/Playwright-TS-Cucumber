import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PurchasePage } from '../pages/purchase.page';
import { Page } from '@playwright/test';

let purchasePage: PurchasePage;

Given('I open the {string} page', async function (this: { page: Page }, url: string) {
  await this.page.goto(url);
  purchasePage = new PurchasePage(this.page);
});

Then("I will login as {string}", async function (this: { page: Page }, username: string) {
  await this.page.fill('[data-test="username"]', username);
  await this.page.fill('[data-test="password"]', 'secret_sauce');
  await this.page.click('[data-test="login-button"]');
});

Then('I will add the backpack to the cart', async function () {
  await purchasePage.addBackpackToCart();
});

Then('I select the cart', async function () {
  await purchasePage.openCart();
});

Then('I select Checkout', async function () {
  await purchasePage.clickCheckout();
});

Then('I fill in the checkout information', async function () {
  await purchasePage.fillCheckoutInfo();
});

Then('I select Continue', async function () {
  await purchasePage.clickContinue();
});

Then('I select Finish', async function () {
  await purchasePage.clickFinish();
});

Then('I should see the text {string}', async function (expectedText: string) {
  const actualText = await purchasePage.getSuccessText();
  expect(actualText?.trim()).toBe(expectedText);
});
