import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Then('I will add the backpack to the cart', async function(this: CustomWorld) {
  await this.productPage.addBackPackToCart();
});

Then('I will sort the items by {string}', async function(this: CustomWorld, sortOption: string) {
  await this.productPage.sortItemsBy(sortOption);
});

Then('I should see all 6 items sorted correctly by price {string}', async function(this: CustomWorld, sortOption: string) {
  await this.productPage.ValidateItemsSortedByPrice(sortOption);
});

Then('I should see all 6 items sorted correctly by Name {string}', async function(this: CustomWorld, sortOption: string) {
  await this.productPage.ValidateItemsSortedByName(sortOption);
});

