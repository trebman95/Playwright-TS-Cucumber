import { Browser, chromium, Page } from 'playwright';

let browser: Browser | null = null;
let page: Page | null = null;
const DEFAULT_TIMEOUT = 30000;

// Initialize browser and page
export const initBrowser = async (): Promise<Page> => {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
  }
  if (!page) {
    page = await browser.newPage();
    page.setDefaultTimeout(DEFAULT_TIMEOUT);
  }
  return page;
};

// Safe getter
export const getPage = (): Page => {
  if (!page) {
    throw new Error('Page has not been initialized. Please call initBrowser first.');
  }
  return page;
};

// Close browser and reset
export const closeBrowser = async (): Promise<void> => {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
};