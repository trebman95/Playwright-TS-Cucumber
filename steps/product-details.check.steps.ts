import { DataTable, Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { ProductDetails } from "../pages/product-details.page";

const productDetails = () => new ProductDetails(getPage());

Then("[Product details page] should be open", async () => {
  await productDetails().IsProductDetailsPageOpened();
});

Then("[Product details page] should show expected content:", async (table: DataTable) => {
  const row = table.hashes()[0];
  await productDetails().IsProductDetailsPageShowingExpectedContent(row.Name, row.Description, row.Price);
});
