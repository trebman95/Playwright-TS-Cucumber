import { After, AfterAll, Status } from '@cucumber/cucumber';
import { getPage, closeBrowser } from '../playwrightUtilities';
import { disposeRequestContext } from '../api/httpClient';
import fs from 'fs';

if (!fs.existsSync('traces')) {
  fs.mkdirSync('traces');
}

After(async function (scenario) {
  try {
    const page = getPage();
    const context = page.context();

    if (scenario.result?.status === Status.FAILED) {
      const safeName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      await context.tracing.stop({ path: `./traces/${safeName}.zip` });
    } else {
      await context.tracing.stop();
    }
  } catch {
    // If page is not initialized, just skip trace saving
  }
});

AfterAll(async () => {
  await closeBrowser();
  await disposeRequestContext();
});
