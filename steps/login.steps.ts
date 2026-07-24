import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Login } from "../pages/login.page";

Then("I should see the title {string}", async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

Then("I will login as {string}", async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then("I should see the error message {string}", async (expectedErrorMessage) => {
  await new Login(getPage()).validateErrorMessage(expectedErrorMessage);
});

Then("I will logout", async () => {
  await new Login(getPage()).logout();
});

Then("I should see the login button", async () => {
  await new Login(getPage()).validateLoginButtonVisible();
});