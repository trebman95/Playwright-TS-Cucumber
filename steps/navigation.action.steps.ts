import { When } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Navigation } from "../pages/navigation.page";

const navigation = () => new Navigation(getPage());

When("[Products page] I click navigation bar button", async () => {
  await navigation().ClickNavigationBarButton();
});

When("[Navigation] I click close", async () => {
  await navigation().ClickNavigationCloseButton();
});

When("[Navigation] I click logout", async () => {
  await navigation().ClickLogoutOption();
});

