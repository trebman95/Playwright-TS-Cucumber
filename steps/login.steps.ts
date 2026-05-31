import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I will login without a password as a {string}', async (userName) => {
  await new Login(getPage()).loginAsUserWithoutPassword(userName);
});

Then('I should see the error message {string}', async (errorMessage) => {
  await new Login(getPage()).verifyErrorMessage(errorMessage);
});