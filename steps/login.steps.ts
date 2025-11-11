import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { expect } from '@playwright/test';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('the error message should be {string}', async (expectedMessage) => {
  const login = new Login(getPage());
  const actualMessage = await login.getErrorMessage();
  expect(actualMessage).toBe(expectedMessage);
});

When('I enter username only {string}', async (userName) => {
  await new Login(getPage()).enterUsernameOnly(userName);
});

When('I click the login button', async () => {
  await new Login(getPage()).clickLogin();
});