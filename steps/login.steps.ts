import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should see error message {string}', async (ErrorMessage) => {
  await new Login(getPage()).validateErrorMessage(ErrorMessage);
});

Then('I should be navigated to the products page', async () => {
  await new Login(getPage()).validateSuccessfulLogin();
});