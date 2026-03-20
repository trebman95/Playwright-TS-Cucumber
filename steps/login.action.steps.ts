import { When } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Login } from "../pages/login.page";

const login = () => new Login(getPage());

When("[Login page] I will login as {string}", async (userName: string) => {
  await login().FillCredentialsAndSubmitLoginForUser(userName);
});

When("[Login page] I login with UserName {string} and Password {string}", async (userName: string, passwordType: string) => {
  await login().FillCredentialsAndSubmitLogin(userName, login().ResolvePasswordFromScenarioType(passwordType));
});
