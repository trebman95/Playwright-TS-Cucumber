import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { Cart } from '../pages/cart.page';

Then('I will proceed to checkout', async () => {
  await new Cart(getPage()).proceedToCheckout();
});

Then('I will enter checkout information', async () => {
    const page = getPage();
    await page.locator('input[id="first-name"]').fill('Shanthi');
    await page.locator('input[id="last-name"]').fill('Gatla');
    await page.locator('input[id="postal-code"]').fill('75019');
});

Then('I will continue checkout', async () => {
    const page = getPage();
    await page.locator('input[id="continue"]').click();
});

Then('I will finish the purchase', async () => {
    const page = getPage();
    await page.locator('button[id="finish"]').click();
});

Then ('I should see the order confirmation text {string}', async (expectedText) => {
    const page = getPage();
    const confirmationTextLocator = page.locator('h2[class="complete-header"]');
    const actualText = await confirmationTextLocator.textContent();
    if (actualText !== expectedText) {
        throw new Error(`Expected confirmation text to be ${expectedText} but found ${actualText}`);
    }
});