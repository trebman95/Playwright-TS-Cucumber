import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';


Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).login(userName);
});


//added by Senia

Then('I should see the login error {string}', async (expectedMessage: string) => {
  await new Login(getPage()).assertErrorMessage(expectedMessage);
});

