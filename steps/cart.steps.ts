import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';
import { Product } from '../pages/product.page';

When('I add the backpack to the cart', async () => {
  // reuse product page method
  await new Product(getPage()).addBackPackToCart();
});

Then('the cart badge should show {string}', async (expected: string) => {
  const count = await new Cart(getPage()).getCartCount();
  if (count.toString() !== expected) {
    throw new Error(`Expected cart badge to show ${expected} but found ${count}`);
  }
});

When('I open the cart', async () => {
  await new Cart(getPage()).openCart();
});

When("I remove the 'Sauce Labs Backpack' from the cart", async () => {
  await new Cart(getPage()).removeItem('Sauce Labs Backpack');
});

Then('the cart badge should not be visible', async () => {
  const visible = await new Cart(getPage()).cartBadgeVisible();
  if (visible) {
    throw new Error('Expected cart badge to not be visible but it was');
  }
});
