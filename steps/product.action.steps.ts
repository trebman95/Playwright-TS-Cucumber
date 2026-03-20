import { When } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Product } from "../pages/product.page";

const product = () => new Product(getPage());

When("I will add the backpack to the cart", async () => {
  await product().ClickAddSauceLabsBackpackToCart();
});

When("[Products page] I click on 'Sort' dropdown button", async () => {
  await product().ClickProductSortDropdownButton();
});

When("[Products page] I click on {string} option", async (optionLabel: string) => {
  await product().SelectSortOptionByLabel(optionLabel);
});

When("[Products page] I click {string} for {string} item", async (buttonLabel: string, itemName: string) => {
  await product().ClickProductCardButtonByLabelForProductNamed(buttonLabel, itemName);
});

When("[Products page] I click the cart icon", async () => {
  await product().ClickShoppingCartBadgeToOpenCart();
});

When("[Products page] I click image for {string} item", async (itemName: string) => {
  await product().ClickProductImageForProductNamed(itemName);
});
