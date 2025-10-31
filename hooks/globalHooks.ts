import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { closeBrowser, initializeBrowser, initializePage } from "../playwrightUtilities";

setDefaultTimeout(15000);

Before( async function() {
    await initializeBrowser();
    const page = await initializePage();
    this.page = page;
})

After( async function () {
    await closeBrowser();
})