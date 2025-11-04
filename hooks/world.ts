import { setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';

let browser: Browser;
let context: BrowserContext;
export let page: Page;

class CustomWorld {
  constructor(_opts: IWorldOptions) {}

  async init() {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  }

  async cleanup() {
    await context?.close();
    await browser?.close();
  }
}
setWorldConstructor(CustomWorld);
