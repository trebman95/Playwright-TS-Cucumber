import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Logout } from '../pages/logout.page';

Then('I logged out of the application', async () => {
    await new Logout(getPage()).logout();
});