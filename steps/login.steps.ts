import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { Menu } from '../pages/menu.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I will login with username {string} and password {string}', async (userName, password) => {
  await new Login(getPage()).loginWithCredentials(userName, password);
});

Then('I should see the error message {string}', async (expectedMessage) => {
  await new Login(getPage()).validateErrorMessage(expectedMessage);
}); 

Then('I will logout', async () => {
  await new Menu(getPage()).logout();
});

Then('I should see the login page', async () => {
  await new Menu(getPage()).validateLoginPage();
});