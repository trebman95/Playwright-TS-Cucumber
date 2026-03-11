import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle: string): Promise<void> => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string} with this password {string}', async (username: string, password: string): Promise<void> => {
  await new Login(getPage()).loginAsUser(username, password);
});

// Without credentials - defaults to standard_user
Then('I will login', async (): Promise<void> => {
  await new Login(getPage()).loginAsUser('standard_user', 'secret_sauce');
});

Then('I should see this result {string}', async (expectedErrorMessage: string): Promise<void> => {
  await new Login(getPage()).validateErrorMessage(expectedErrorMessage);
})