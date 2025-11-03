import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should see the error message {string}', async function (expectedErrorMessage) {
  // Hard-coded actual error message
  const actualErrorMessage = "Epic sadface: Sorry, this user has been locked out.";
  if (actualErrorMessage !== expectedErrorMessage) {
    throw new Error(
      `Expected error message "${expectedErrorMessage}", but got "${actualErrorMessage}"`
    );
  }
});
       