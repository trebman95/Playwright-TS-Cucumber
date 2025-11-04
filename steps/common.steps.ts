import { Given } from '@cucumber/cucumber';
import { page } from '../hooks/world';
import { LoginPage } from '../pages/LoginPage';

Given('I open the app', async function () {
  const login = new LoginPage(page);
  await login.goto();
});
