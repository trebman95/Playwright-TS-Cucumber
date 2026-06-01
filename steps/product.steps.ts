import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

// {int} automatically converts the value to a number.
Then('the inventory should show {int} products', async (expectedCount: number) => {
    await new Product(getPage()).validateProductCount(expectedCount);
});

When('I add the backpack to the cart', async () => {
    await new Product(getPage()).addBackPackToCart();
});

When('I sort products by price {string}', async (sort: string) => {
    await new Product(getPage()).sortByPrice(sort);
});

Then('all products should be sorted by price {string}', async (sort: string) => {
    await new Product(getPage()).validatePriceSortOrder(sort);
});

Then('the cart badge should show {string}', async (count: string) => {
    await new Product(getPage()).validateCartCount(count);
});
