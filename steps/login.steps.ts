import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../hooks/world';
import { LoginPage } from '../pages/LoginPage';

When('I login with username {string} and password {string}', async function (user: string, pass: string) {
  const login = new LoginPage(page);
  await login.login(user, pass);
});

Then('the page title should be {string}', async function (expected: string) {
  await expect(page).toHaveTitle(expected);
});

Then('I should see a login error {string}', async function (message: string) {
  const login = new LoginPage(page);
  await expect(login.error()).toHaveText(message);
});
