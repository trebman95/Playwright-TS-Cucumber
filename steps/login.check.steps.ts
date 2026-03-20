import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Login } from "../pages/login.page";

const login = () => new Login(getPage());

Then("[Login page] {string} title should be present", async (expectedTitle: string) => {
  await login().IsLoginPageShowingTitle(expectedTitle);
});

Then("[Login page] I should see the error message {string}", async (errorMessage: string) => {
  await login().IsLoginPageShowingErrorMessage(errorMessage);
});
