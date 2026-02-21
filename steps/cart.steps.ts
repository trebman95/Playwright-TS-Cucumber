import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';

Then('I should see {string} item in the cart badge', async (expectedCount) => {
  await new Cart(getPage()).validateCartBadgeCount(expectedCount);
});

Then('I will remove the backpack from the cart', async () => {
  await new Cart(getPage()).removeBackpackFromCart();
});

Then('the cart badge should not be visible', async () => {
  await new Cart(getPage()).validateCartBadgeNotVisible();
});
