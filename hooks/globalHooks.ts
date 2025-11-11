import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { closeBrowser, closePage, initializeBrowser, initializePage } from "../playwrightUtilities";

setDefaultTimeout(30000);

Before( async () => {
    await initializeBrowser();
    await new Promise(resolve => setTimeout(resolve, 500));
    await initializePage();
})

After( async () => {
    await closePage();
    await closeBrowser();
})