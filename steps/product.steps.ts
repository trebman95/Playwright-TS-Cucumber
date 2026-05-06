import { test } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { Product } from '../pages/product.page';

const { Then } = createBdd(test);

Then('I will add the backpack to the cart', async ({ page }) => {
  await new Product(page).addBackPackToCart();
});