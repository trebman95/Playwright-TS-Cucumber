import { When } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Cart } from "../pages/cart.page";

const cart = () => new Cart(getPage());

When("[Cart] I click {string}", async (label: string) => {
  await cart().ClickCartPageButtonByLabel(label);
});

When("[Cart] I click {string} for {string} item", async (buttonLabel: string, itemName: string) => {
  await cart().ClickCartRowButtonByLabelForItemNamed(buttonLabel, itemName);
});
