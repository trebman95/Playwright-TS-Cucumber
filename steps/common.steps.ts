import { Given, Then} from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";

Given('I open the {string} page', async (url) => {
    await getPage().goto(url);
  });

Then('I should see the title {string}', async (expectedTitle: string) => {
    const pageTitle = await getPage().title();
    if (pageTitle !== expectedTitle) {
        throw new Error(`Expected title to be "${expectedTitle}" but found "${pageTitle}"`);
    }
});