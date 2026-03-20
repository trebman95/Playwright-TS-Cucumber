import { DataTable, When } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Checkout } from "../pages/checkout.page";

const checkout = () => new Checkout(getPage());

When("[Checkout] I fill the checkout page with next value:", async (table: DataTable) => {
  const row = table.hashes()[0];
  await checkout().FillCheckoutCustomerFields(row["First Name"] ?? "", row["Last Name"] ?? "", row["Zip code"] ?? "");
});

When("[Checkout] I click on {string} button", async (buttonLabel: string) => {
  await checkout().ClickCheckoutButtonByLabel(buttonLabel);
});
