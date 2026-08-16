import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle: string) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (username: string) => {
  await new Login(getPage()).loginAsUser(username);
});

When('I click on the login button', async () => {
  await getPage().click('[data-test="login-button"]');
});

Then('I should see an error message {string}', async (message: string) => {
  const error = await getPage().textContent('[data-test="error"]');
  expect(error?.trim()).toBe(message);
});
