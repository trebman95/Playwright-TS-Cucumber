import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

// ✅ Step - validates page title
Then('I should see the title {string}', async (expectedTitle: string) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

// ✅ Step - logs in as specific user
Then('I will login as {string}', async (userName: string) => {
  await new Login(getPage()).loginAsUser(userName);
});

// ✅ Step - validates login error message
Then('I should see the error message {string}', async (expectedMessage: string) => {
  await new Login(getPage()).validateErrorMessage(expectedMessage);
});

