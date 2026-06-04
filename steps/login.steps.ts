import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should see the error message container', async () => {
  await new Login(getPage()).validateErrorExists();
});

Then('The error message container should contain the text {string}', async (expectedMessage) => {
  await new Login(getPage()).validateErrorMessage(expectedMessage);
});