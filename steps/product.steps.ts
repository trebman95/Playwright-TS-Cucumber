import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I should see cart icon with {string} item', async (count: string) => {
await new Product(getPage()).validateCartIcon(count);
});


Then ('I will go to the cart', async () => {
  await new Product(getPage()).goToCart();
});

Then ('I will proceed to Checkout', async () => {
  await new Product(getPage()).proceedToCheckout();
});

Then ('I will Fill in Checkout information', async () => {
  await new Product(getPage()).fillCheckoutInformation();
});

Then ('I will Continue to Checkout', async () => {
  await new Product(getPage()).continueToCheckout();
});

Then ('I will Finish the purchase', async () => {
  await new Product(getPage()).finishThePurchase();
});

Then ('I should see successful message {string}', async (message: string) => {
  await new Product(getPage()).validateSuccessMessage(message);
});

Then('I will sort the items by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortItemsByPrice(sortOption);
});

Then('I should see all items are sorted correctly by price {string}', async (sortOption: string) => {
  await new Product(getPage()).validateItemsSortedByPrice(sortOption);
});
