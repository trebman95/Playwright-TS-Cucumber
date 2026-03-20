import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will click on the shopping cart', async () => {
  await new Purchase(getPage()).clickShoppingCart();
});

Then('I will click on checkout', async () => {
  await new Purchase(getPage()).clickCheckout();
});

Then('I will fill the checkout information', async () => {
  await new Purchase(getPage()).fillCheckoutInformation();
});

Then('I will click on continue', async () => {
  await new Purchase(getPage()).clickContinue();
});

Then('I will click on finish', async () => {
  await new Purchase(getPage()).clickFinish();
});

Then('I should see the order confirmation message', async () => {
  await new Purchase(getPage()).validateTitle('Thank you for your order!');
});

Then('I sort the items by {string}', async (sortType) => {
  const page = getPage();
  const priceTexts = await page.locator(".inventory_item_price").allTextContents();

   if (priceTexts.length !== 6) {
    throw new Error(`❌ Expected 6 items but found: ${priceTexts.length}`);
  }

  // Convert to number array
  const actualPrices = priceTexts.map(p => parseFloat(p.replace("$", "")));

  // Create expected sorted list
  const expectedPrices = [...actualPrices];

  if (sortType === "Price (low to high)") {
    expectedPrices.sort((a, b) => a - b);
  } else if (sortType === "Price (high to low)") {
    expectedPrices.sort((a, b) => b - a);
  }

  // Compare actual vs expected
  if (JSON.stringify(actualPrices) !== JSON.stringify(expectedPrices)) {
    throw new Error(`❌ Sorting failed for: ${sortType}\nActual: ${actualPrices}\nExpected: ${expectedPrices}`);
  }

  console.log(`✅ Sorting validated successfully for: ${sortType}`);
});

Then ('I validate the sorting of items', async () => {
  const priceTexts = await this.page.locator(".inventory_item_price").allTextContents();
  const actualPrices = priceTexts.map((p: string) => parseFloat(p.replace("$", "")));
    const expectedPrices = [...actualPrices];
});



