import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { closeBrowser, initializeBrowser, initializePage } from "../playwrightUtilities";

setDefaultTimeout(40000);

Before({ timeout: 60 * 1000 }, async () => {
    await initializeBrowser();
    await initializePage();
})

After({ timeout: 60 * 1000 }, async () => {
    await closeBrowser();
})