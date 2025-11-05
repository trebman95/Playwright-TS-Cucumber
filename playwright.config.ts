import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = ({
   testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});

export default config;