import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});


Then('I should see error message {string}', async (message) => {
  const page = getPage();
  const errorLocator = page.locator('[data-test="error"]');
  await errorLocator.waitFor({ state: 'visible' });
  await expect(errorLocator).toHaveText(message);
});
