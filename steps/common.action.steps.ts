import { When } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";

When("I open the {string} page", async (url: string) => {
  await getPage().goto(url);
});
