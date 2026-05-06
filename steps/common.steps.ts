import { test } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';

const { Given } = createBdd(test);

Given('I open the {string} page', async ({ page }, url) => {
    await page.goto(url);
  });