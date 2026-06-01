import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('the page title should be {string}', async (expectedTitle: string) => {
    await new Login(getPage()).validateTitle(expectedTitle);
});

When('I login as {string}', async (userName: string) => {
    await new Login(getPage()).loginAsUser(userName);
});

Then('I should see an error containing {string}', async (errorFragment: string) => {
    await new Login(getPage()).validateErrorContains(errorFragment);
});

Then('I should be on the {string} page', async (urlFragment: string) => {
    await new Login(getPage()).validateCurrentUrl(urlFragment);
});
