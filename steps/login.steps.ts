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

Then('I should see the login error {string}', async (expectedMessage) => {
    await new Login(getPage()).validateErrorMessage(expectedMessage);
});
Then('I should the login error message {string}', async (expectedMessage: string) => {
  const page = getPage();
  const loginPage = new Login(page);
  const actualMessage = await loginPage.getErrorMessage();
  expect(actualMessage).toBe(expectedMessage);
});