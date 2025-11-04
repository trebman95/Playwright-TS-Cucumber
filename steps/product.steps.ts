import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

When('I click on the cart', async () => {
  await new Product(getPage()).clickCart();
});

When('I select the sort option as {string}', async (sortOption: string) => {
  // await new Product(getPage()).clickSortOptionLocator();
  await new Product(getPage()).selectSortOption(sortOption);
});

Then('I should see all the items are sorted by price correctly', async (data) => {
  await new Product(getPage()).verifyPiceSort(data);
});

Then('I should see the backpack in the cart', async () => {
  await new Product(getPage()).verifyBackupVisibleInCart();
});

When('I click on checkout button', async () => {
  await new Product(getPage()).clickCheckoutButton();
});
