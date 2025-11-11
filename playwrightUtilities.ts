import { Browser, chromium, Page } from 'playwright';

let browser: Browser | null = null;
let page: Page | null = null;
const DEFAULT_TIMEOUT = 30000;

export const initializeBrowser = async () => {
  try {
    if (!browser) {
      browser = await chromium.launch({ headless: true, timeout: 60000 });
    }
  } catch (error) {
    console.error('Failed to initialize browser:', error);
    browser = null;
    throw error;
  }
};

export const initializePage = async () => {
  try {
    if (!browser) {
      throw new Error('Browser not initialized');
    }
    if (!page) {
      page = await browser.newPage();
      page.setDefaultTimeout(DEFAULT_TIMEOUT);
    }
  } catch (error) {
    console.error('Failed to initialize page:', error);
    page = null;
    throw error;
  }
};

export const getPage = (): Page => {
  if (!page) {
    throw new Error('Page has not been initialized. Please call initializePage first.');
  }
  return page;
};

export const closePage = async () => {
  if (page) {
    try {
      await page.close();
    } catch (error) {
      console.error('Error closing page:', error);
    }
  }
  page = null;
};

export const closeBrowser = async () => {
  if (page) {
    try {
      await page.close();
    } catch (error) {
      console.error('Error closing page:', error);
    }
  }
  page = null;
  
  if (browser) {
    try {
      await browser.close();
    } catch (error) {
      console.error('Error closing browser:', error);
    }
  }
  browser = null;
};