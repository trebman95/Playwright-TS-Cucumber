import { Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});


When('I sort products by {string}', async (sortOption) => {
    await new Product(getPage()).sortBy(sortOption);
});


Then('all products should be sorted by {string}', async (sortOption) => {
  await new Product(getPage()).validateSorting(sortOption);
});
    

