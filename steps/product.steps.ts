import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I click on the cart',async () => {
  await new Product(getPage()).openCart();
})

Then('I Select Checkout',async () => {
  await new Product(getPage()).clickCheckout();
})

Then('I Fill in the {string}, {string}, and {string}',async (firstName,lastName, zipCode) => {
  await new Product(getPage()).fillPersonalInfo(firstName, lastName, zipCode);
})
Then('I Select Continue',async () => {
  await new Product(getPage()).clickContinue();
})

Then('I Select Finish',async () => {
  await new Product(getPage()).clickFinish();
})

Then('I Validate the text {string}',async(expectedConfimationMessage) => {
  await new Product(getPage()).validatePurchaseConfirmationText(expectedConfimationMessage);
});

Then('I sort the products by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortProductsBy(sortOption);
});

Then('the product prices should be sorted {string}', async (order: string) => {
  await new Product(getPage()).validatePricesSorted(order);
});

Then('the cart badge count should be {string}', async (count: string) => {
  await new Product(getPage()).validateCartBadgeCount(count);
});

Then('I remove the backpack from the cart', async () => {
  await new Product(getPage()).removeBackPackFromCart();
});

Then('the cart badge should not be visible', async () => {
  await new Product(getPage()).validateCartBadgeNotVisible();
});