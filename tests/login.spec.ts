
import { test, expect } from '@playwright/test';
import { Login } from '../pages/login.page'; 

test('login with valid user', async ({ page }) => {
  const loginPage = new Login(page);

  // Navigate to your app
  await page.goto('https://www.saucedemo.com/');

  // Validate title
  await loginPage.validateTitle('Swag Labs');

  // Perform login
  await loginPage.loginAsUser('standard_user');

  // Verify login worked 
  await expect(page.locator('.inventory_list')).toBeVisible();
});
