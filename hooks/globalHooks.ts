import { Before, After } from '@cucumber/cucumber';
import { initBrowser, closeBrowser } from '../playwrightUtilities';

Before(async function () {
  await initBrowser(); // initialize browser and page before any scenario
});

After(async function () {
  await closeBrowser(); // close browser after scenario
});