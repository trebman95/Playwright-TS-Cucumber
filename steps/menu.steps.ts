import { Then } from "@cucumber/cucumber";
import { Menu } from "../pages/menu.page";
import { getPage } from "../playwrightUtilities";
import { expect } from "playwright/test";

Then("I open the menu", async function () {
  await new Menu(getPage()).openMenu();
});

Then('I click on "Reset App State"', async function () {
  await getPage().waitForTimeout(2000);
  await new Menu(getPage()).resetAppState();
});

Then("I verify that the cart is empty", async function () {
  const menu = new Menu(getPage());
  const empty = await menu.isCartEmpty();
  expect(empty).toBeTruthy();
});
