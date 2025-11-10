import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { closeBrowser, initializeBrowser, initializePage } from "../playwrightUtilities";
import { selectors } from "playwright";

setDefaultTimeout(15000);

Before( async () => {
    selectors.setTestIdAttribute('data-test');
    await initializeBrowser();
    await initializePage();
})

After( async () => {
    await closeBrowser();
})