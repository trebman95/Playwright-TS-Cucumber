import { Browser, chromium, Page } from 'playwright';

let browser: Browser | null = null;
let page: Page | null = null;
const DEFAULT_TIMEOUT = 30000;

const launchOptions = {
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
};

export const initializeBrowser = async () => {
  if (!browser) {
    try {
      browser = await chromium.launch({
        ...launchOptions,
        channel: 'chrome',
      });
    } catch (error) {
      console.warn('System Chrome was not available, falling back to bundled Chromium.', error);
      browser = await chromium.launch(launchOptions);
    }
  }
};

export const initializePage = async () => {
  if (browser && !page) {
    page = await browser.newPage();
    page.setDefaultTimeout(DEFAULT_TIMEOUT);
  }
};

export const getPage = (): Page => {
  if (!page) {
    throw new Error('Page has not been initialized. Please call initializePage first.');
  }
  return page;
};

export const closeBrowser = async () => {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
};