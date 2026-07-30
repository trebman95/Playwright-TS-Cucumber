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

Then(
    'I enter first name {string}, last name {string}, and postal code {string}',
    async (
        firstName: string,
        lastName: string,
        postalCode: string
    ) => {
        await new Product(getPage()).enterCustomerInformation(
            firstName,
            lastName,
            postalCode
        );
    }
);

Then('I select continue', async () => {
    await new Product(getPage()).selectContinue();
});

Then('I select finish', async () => {
    await new Product(getPage()).selectFinish();
});

Then(
    'I should see the purchase confirmation {string}',
    async (expectedMessage: string) => {
        await new Product(getPage()).validatePurchaseConfirmation(
            expectedMessage
        );
    });

Then('I sort the products by {string}', async (sortOption: string) => {
    await new Product(getPage()).sortProducts(sortOption);
});

Then(
    'the product prices should be sorted {string}',
    async (order: string) => {
        await new Product(getPage()).validateProductPricesSorted(order);
    }
);