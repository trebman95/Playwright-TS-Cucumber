import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { expect } from '@playwright/test';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should see the login error message {string}', async (expectedMessage) => {
  // Adjust selector to match your app's error element
  const errorLocator = getPage().locator('[data-test="error"]');

  await expect(errorLocator).toBeVisible();
  await expect(errorLocator).toHaveText(expectedMessage);
});