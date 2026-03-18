import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Cart } from '../pages/cart.page';
import { Checkout } from '../pages/checkout.page';
import { CheckoutOverview } from '../pages/checkoutOverview.page';
import { CheckoutComplete } from '../pages/checkoutComplete.page';


Then('I open the cart', async () => {
  await new Cart(getPage()).openCart();
});

Then('the cart should contain {string} with price {string} and quantity {string}', 
  async (name, price, qty) => {
    await new Cart(getPage()).validateCartItem(name, price, qty);
});

Then('I proceed to checkout', async () => {
  await new Cart(getPage()).goToCheckout();
});

Then('I fill in checkout information', async () => {
  await new Checkout(getPage()).fillInformation("John", "Green", "10101");
});

Then('I continue checkout', async () => {
  await new Checkout(getPage()).continue();
});

Then('I finish the purchase', async () => {
  await new CheckoutOverview(getPage()).finish();
});

Then('I should see the success message', async () => {
  await new CheckoutComplete(getPage()).validateSuccessMessage();
});

