import { Browser, chromium, Page } from 'playwright';

let browser: Browser | null = null;
let page: Page | null = null;
const DEFAULT_TIMEOUT = 30000;
const HEADLESS = process.env.HEADLESS !== 'false';
const BROWSER_CHANNEL = process.env.BROWSER_CHANNEL;

export const initializeBrowser = async () => {
  if (!browser) {
    browser = await launchBrowser();
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

const launchBrowser = async () => {
  const launchOptions = getLaunchOptions(BROWSER_CHANNEL);

  try {
    return await chromium.launch(launchOptions);
  } catch (launchError) {
    if (BROWSER_CHANNEL) {
      throw launchError;
    }

    return await chromium.launch(getLaunchOptions('chrome'));
  }
};

const getLaunchOptions = (channel?: string): Parameters<typeof chromium.launch>[0] => {
  return {
    headless: HEADLESS,
    ...(channel ? { channel } : {}),
  };
};
