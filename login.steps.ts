import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then('I should see error message {string}', async function (message: string) {
  const errorLocator = this.page.locator('[data-test="error"]');
  await expect(errorLocator).toHaveText(message);
});


