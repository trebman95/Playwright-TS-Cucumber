import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { expect } from '@playwright/test';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

When('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should see error message as {string}', async (errorMessage) => {
  const error = getPage().locator('[data-test="error"]');

  await expect(error).toBeVisible();
  await expect(error).toContainText(errorMessage);
});