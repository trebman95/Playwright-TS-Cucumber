import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { expect } from '@playwright/test';
import { Page } from '@playwright/test';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then('I will login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then(
  'I should see the login error message {string}',
  async function (this: { page: Page }, expectedMessage: string) {
    const errorLocator = this.page.locator('h3[data-test="error"]');
    const actualMessage = await errorLocator.textContent();
    expect(actualMessage?.trim()).toBe(expectedMessage);
  }
);