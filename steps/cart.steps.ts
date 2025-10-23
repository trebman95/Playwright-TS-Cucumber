import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';

Then('I should see {string} items in the cart', async (expectedCount) => {
  await new Cart(getPage()).validateCartItemCount(expectedCount);
});

Then('I will remove all items from cart', async () => {
  await new Cart(getPage()).removeAllItemsFromCart();
});

Then('the cart should be empty', async () => {
  await new Cart(getPage()).validateCartIsEmpty();
});

Then('I will select continue shopping', async () => {
  await new Cart(getPage()).selectContinueShopping();
});
