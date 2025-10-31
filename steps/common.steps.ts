import { Given } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";

Given('I open the {string} page', async (url: string) => {
  const page = getPage();
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
});