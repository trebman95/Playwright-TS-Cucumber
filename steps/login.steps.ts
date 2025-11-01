import { Then } from '@cucumber/cucumber';
import { getPage, delay } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
  await delay(1000); // short pause for visual verification
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
  await delay(1500); // wait for UI to update after login
});

Then('I should see the error message {string}', async (expectedMessage: string) => {
  await new Login(getPage()).validateErrorMessage(expectedMessage);
  await delay(1000);
});
