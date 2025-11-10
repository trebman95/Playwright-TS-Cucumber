import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

// Uses Optional text expression for backward compatibility
When('I( will) login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('The error will read {string}', async (expected) => {
  await new Login(getPage()).validateError(expected);
});