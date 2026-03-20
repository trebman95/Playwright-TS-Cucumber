import { Given, Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { expect } from '@playwright/test';

Given('I open the {string} page', async (url) => {
    await getPage().goto(url);
  });


Then('I should be on the inventory page', async () => {
  await expect(getPage()).toHaveURL(/inventory\.html/);
});