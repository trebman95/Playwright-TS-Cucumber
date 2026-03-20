import { DataTable, Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Cart } from "../pages/cart.page";

const cart = () => new Cart(getPage());

Then("[Cart] page should be open", async () => {
  await cart().IsCartPageOpened();
});

Then("[Cart] {string} should be present", async (itemName: string) => {
  await cart().IsCartPageContainingItemNamed(itemName);
});

Then("[Cart] {string} should not be present", async (itemName: string) => {
  await cart().IsCartPageNotContainingItemNamed(itemName);
});

Then("[Cart] the following items should be in the cart:", async (table: DataTable) => {
  const names = table.hashes().map((row) => row.Item.trim());
  await cart().IsCartPageContainingExactlyTheseItemNames(names);
});
