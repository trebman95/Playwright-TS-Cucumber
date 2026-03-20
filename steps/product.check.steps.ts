import { DataTable, Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Product } from "../pages/product.page";

const product = () => new Product(getPage());

Then("[Products page] Page should be opened", async () => {
  await product().IsProductsPageOpened();
});

Then("[Products page] '{int}' Products should be present on the page", async (n: number) => {
  await product().IsProductPageContainingExpectedProductCount(n);
});

Then("[Products page] {string} dropdown menu should be present with next options:", async (_sortLabel: string, table: DataTable) => {
  const options = table.rows().slice(1).map((r) => r[0]);
  await product().IsSortDropdownContainingExpectedOptions(options);
});

Then("[Products page] {string} dropdown menu should be closed", async (_sortLabel: string) => {
  await product().IsProductSortDropdownVisible();
});

Then("[Products page] {string} value should be present in the 'Sort' dropdown field", async (expected: string) => {
  await product().IsSortDropdownShowingSelectedValue(expected);
});

Then("[Products page] Products should be sorted with the next values:", async (table: DataTable) => {
  const rows = table.hashes().map((row) => ({ Name: row.Name, Price: row.Price }));
  await product().IsProductListOrderedAsExpected(rows);
});

Then("[Products page] I should see {string} in the cart badge", async (expectedCountText: string) => {
  const expectedCount = Number.parseInt(expectedCountText, 10);
  await product().IsShoppingCartBadgeShowingExpectedItemCount(expectedCount);
});

Then("[Products page] page should be open", async () => {
  await product().IsProductsPageOpened();
});

Then("[Products page] cart badge should be removed", async () => {
  await product().IsShoppingCartBadgeNotVisible();
});
