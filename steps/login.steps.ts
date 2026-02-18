import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { expect } from '@playwright/test';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('Validate error message as {string}', async (expectedMessage) => {
  await new Login(getPage()).validateErrorMessage(expectedMessage);
});


