import { Given } from '@cucumber/cucumber';
import { initializeBrowser, initializePage, getPage } from '../playwrightUtilities';

Given('I open the {string} page', async (url: string) => {
  // ✅ Start browser if not already running
  await initializeBrowser();

  // ✅ Create page if not created yet
  await initializePage();

  // ✅ Navigate to the requested page
  await getPage().goto(url);

  // ✅ Start trace recording now that page exists
  const context = getPage().context();
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });
});
