import { test } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { Login } from '../pages/login.page';

const { Then } = createBdd(test);

Then('I should see the title {string}', async ({ page }, expectedTitle) => {
  await new Login(page).validateTitle(expectedTitle);
});

Then('I will login as {string}', async ({ page }, userName) => {
  await new Login(page).loginAsUser(userName);
});