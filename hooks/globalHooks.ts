import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { closeBrowser, initializeBrowser, initializePage, DEFAULT_TIMEOUT } from "../playwrightUtilities";

// Increase Cucumber step timeout to match Playwright defaults
setDefaultTimeout(DEFAULT_TIMEOUT);

Before(async () => {
    await initializeBrowser();
    await initializePage();
});

After(async function (scenario) {
    // Slight delay on failure can help debugging and avoid race conditions
    if ((scenario as any).result?.status !== 'PASSED') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    await closeBrowser();
});