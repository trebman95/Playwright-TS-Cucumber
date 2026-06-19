import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let page: Page;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  pageFixture.page = page;
});

After(async () => {
  await page.close();
  await browser.close();
});