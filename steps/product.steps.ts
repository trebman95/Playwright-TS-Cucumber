import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
    await new Product(getPage()).addBackPackToCart();
});

Then('I select the cart', async () => {
    await new Product(getPage()).selectCart();
});

Then('I select checkout', async () => {
    await new Product(getPage()).selectCheckout();
});

Then('I fill checkout information', async () => {
    await new Product(getPage()).fillCheckoutInformation();
});

Then('I select continue', async () => {
    await new Product(getPage()).selectContinue();
});

Then('I select finish', async () => {
    await new Product(getPage()).selectFinish();
});

Then(
    'I should see purchase success message {string}',
    async (message) => {
        await new Product(getPage())
            .validateSuccessMessage(message);
    }
);

Then(
    'I sort products by {string}',
    async (sort) => {
        await new Product(getPage())
            .sortProductsBy(sort);
    }
);

Then(
    'I validate products are sorted correctly by {string}',
    async (sort) => {
        await new Product(getPage())
            .validateProductsSortedByPrice(sort);
    }
);