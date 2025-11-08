import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import {chromium, expect, Page, Browser} from "@playwright/test";

let browser: Browser;
let page: Page;

Before(async () => {
  browser = await chromium.launch({headless: true});
  page = await browser.newPage();
})

After(async () => {
  await browser.close();
})

Given('I open the {string} page', async(url:string) => {
  await page.goto(url);
});

When('I verify the page title', async() => {
  await page.waitForLoadState('domcontentloaded');
});

Then('I should see the title {string}', async (expectedTitle: string) => {
  await expect(page).toHaveTitle(expectedTitle);
});

When('I will login as {string}', async (username: string) => {
  await page.fill('#user-name', username);
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});

Then('I should see the error message {string}', async (expectedMsg: string) => {
  const error = page.locator('[data-test="error"]');
  await expect(error).toContainText(expectedMsg);
});