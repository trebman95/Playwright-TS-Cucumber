import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('the url should be {string}', async (url) =>
{
  await new Login(getPage()).validateUrl(url);
});

Then('I should see the error {string}', async (errorMessage) =>
{
  // const login = new Login(getPage())
  // await login.loginAsUser("locked_out_user");
  // await login.validateError(errorMessage);

  await new Login(getPage()).validateError(errorMessage)
});

