import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle: string) => {
  await new Login(getPage()).validateTitle(expectedTitle);
  console.log(`Validated page title: ${expectedTitle}`);
});

Then('I will login as {string}', async (userName: string) => {
  await new Login(getPage()).loginAsUser(userName);
  console.log(`Attempted login with username: ${userName}`);
});

Then('I should see the error message {string}', async (expectedMessage: string) => {
  await new Login(getPage()).validateErrorMessage(expectedMessage);
  console.log(`Validated error message: ${expectedMessage}`);
});

Then('I should not be logged in', async () => {
  await new Login(getPage()).validateLoginFailed();
  console.log('Validated that login failed');
});