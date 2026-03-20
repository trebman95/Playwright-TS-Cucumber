import { When } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { ProductDetails } from "../pages/product-details.page";

const productDetails = () => new ProductDetails(getPage());

When("[Product details page] I click {string} button", async (buttonLabel: string) => {
  await productDetails().ClickButtonByLabelOnProductDetailsPage(buttonLabel);
});
