import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: process.env.HEADLESS !== 'false',
    channel: process.env.BROWSER_CHANNEL,
  },
};

export default config;
