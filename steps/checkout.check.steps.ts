import { DataTable, Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Checkout } from "../pages/checkout.page";

const checkout = () => new Checkout(getPage());

Then("[Checkout] page should be open", async () => {
  await checkout().IsCheckoutPageOpened();
});

Then("[Checkout] {string} section should be present", async (sectionLabel: string) => {
  await checkout().IsCheckoutOverviewSectionPresent(sectionLabel);
});

Then("[Checkout] {string} should be present with next values:", async (_label: string, table: DataTable) => {
  const row = table.hashes()[0];
  await checkout().IsCheckoutOverviewSubtotalTaxAndTotalMatchingExpected(row["Item total"], row["Tax"], row["Total"]);
});

Then("[Checkout] order summary should list products:", async (table: DataTable) => {
  const names = table.hashes().map((row) => row.Product.trim());
  await checkout().IsCheckoutOverviewContainingExactlyTheseProductNames(names);
});

Then("[Checkout] I should see {string} text", async (expectedText: string) => {
  await checkout().IsOrderCompletePageShowingHeaderText(expectedText);
});

Then("[Checkout] I should see error message {string}", async (expectedMessage: string) => {
  await checkout().IsCheckoutStepOneShowingErrorBannerWithMessage(expectedMessage);
});
