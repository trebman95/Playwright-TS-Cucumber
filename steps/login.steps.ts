import { Then,When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { expect } from '@playwright/test';
import { Given } from '@cucumber/cucumber';

console.log("✅ login.steps.ts LOADED");

Given('I open the SauceDemo page', async () => {
  const page = getPage();  // ✅ only called after Before hook runs
  await page.goto('https://www.saucedemo.com/');
});
When('I login with username {string}', async function (userName) { 
  await new Login(getPage()).loginAsUser(userName)
});

Then('I should be on the inventory page', async function () {
  const page = getPage();
  await expect(page).toHaveURL(/inventory/);
});

Then('the page title should be {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I should see the error message {string}', async (expectedMessage: string) => {
  const actual = await new Login(getPage()).getErrorMessage();
  expect(actual).toContain(expectedMessage);
});