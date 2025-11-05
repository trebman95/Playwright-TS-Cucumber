import { Then , When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

When('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I should see the error message {string}', async (expectedMessage) => {
  const actualMessage = await getPage().locator('.error-message-container').textContent();
  if (actualMessage?.trim() !== expectedMessage) throw new Error(`Expected "${expectedMessage}", but got "${actualMessage}"`);
});
