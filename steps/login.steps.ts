import { Given, Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { expect } from 'playwright/test';

Given('Login page is available after loading',async()=>{
  
  const loginPage = new Login(getPage());
  // Example: check that login form text or button is visible
  await loginPage.loginpageText();
});

When('I will login as {string}',async(Username)=>{
const login= new Login(getPage());
  await login.loginAsUser(Username);
});

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});


Then('I see error message {string}', async (errorMessage) => {

const login= new Login(getPage());

  await login.errorWithUser(errorMessage)
});