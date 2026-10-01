import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will select the cart on the top-right', async () => {
    await getPage().locator('[data-test="shopping-cart-link"]').click();
});

Then('I will select Checkout', async() => {
   await getPage().locator('[data-test="checkout"]').click();
});


Then('I will fill in the First Name, Last Name, and Postal Code', async() => {
  const firstName = getPage().locator('[data-test="firstName"]');
  const lastName = getPage().locator('[data-test="lastName"]');
  const zipCode = getPage().locator('[data-test="postalCode"]');

  await firstName.fill('Shawn');
  await lastName.fill('Michaels');
  await zipCode.fill('28208');
});