import { Then } from '@cucumber/cucumber';
import { PurchasePage } from '../pages/purchasePage';
import { pageFixture } from '../hooks/pageFixture';
import { expect } from '@playwright/test';
import { Product } from '../pages/product.page';

let purchasePage: PurchasePage;

Then('I should see the confirmation header', async () => {
  purchasePage = new PurchasePage(pageFixture.page);
  const header = await purchasePage.getConfirmationHeader();
  await expect(header).toHaveText('Thank you for your order!');
});

Then('I should see the confirmation message', async () => {
  const message = await purchasePage.getConfirmationMessage();
  await expect(message).toContainText(
    'Your order has been dispatched'
  );
});

Then('I should be on the checkout complete page', async () => {
  const url = await purchasePage.getCurrentUrl();
  await expect(url).toContain('checkout-complete');
});