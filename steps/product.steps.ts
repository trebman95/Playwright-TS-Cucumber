import { Then } from '@cucumber/cucumber';

import { getPage } from '../playwrightUtilities';

import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
    await new Product(getPage()).addBackPackToCart();
});

Then('I will sort the items by {string}', async (sort) => {
    await new Product(getPage()).sortItems(sort);
});

Then('I should see all products sorted by {string}', async (sort) => {
    await new Product(getPage()).validateProductSort(sort);
});