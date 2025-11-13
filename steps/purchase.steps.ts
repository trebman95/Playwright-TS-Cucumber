import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Then('I will proceed to checkout', async function(this: CustomWorld) {
  await this.purchasePage.proceedToCheckout();
});

Then('I will fill in the checkout information with {string} as First Name, {string} as Last Name, and {string} as Zip\\/Postal Code and continue', async function(this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
  await this.purchasePage.fillCheckoutInformation(firstName, lastName, postalCode);
});

Then('I will Verify the backpack in the checkout overview and select Finish', async function(this: CustomWorld) {
  const backpackInOverview = this.page.locator('div[class="inventory_item_name"]').filter({ hasText: 'Sauce Labs Backpack' });
  if (await backpackInOverview.count() === 0) {
    throw new Error('Backpack not found in checkout overview');
  }
  await this.page.locator('button[id="finish"]').click();
});

Then('I should see the successful purchase text {string}', async function(this: CustomWorld, expectedMessage: string) {
  const actualMessage = await this.page.locator('h2[class="complete-header"]').textContent();
  if (actualMessage?.trim() !== expectedMessage) {
    throw new Error(`Expected confirmation message to be "${expectedMessage}" but found "${actualMessage}"`);
  }
});