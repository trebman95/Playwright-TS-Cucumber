import { DataTable, Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Navigation } from "../pages/navigation.page";

const navigation = () => new Navigation(getPage());

Then("[Navigation] should be open", async () => {
  await navigation().IsNavigationOpen();
});

Then("[Navigation] options should be present with next options:", async (table: DataTable) => {
  await navigation().IsNavigationOptionsPresentFromTable(table);
});

Then("[Navigation] should be closed", async () => {
  await navigation().IsNavigationClosed();
});

