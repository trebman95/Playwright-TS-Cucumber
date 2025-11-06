import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle: string) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

When('I will login as {string}', async (userName: string) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should get an error message as {string}', async (userName: string) => {
  await new Login(getPage()).loginAsUser(userName);
});
