import { DataTable, Then, When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

When('I click the shopping cart', async () => {
    await new Purchase(getPage()).clickShoppingCart();
});

When('I click checkout', async () => {
    await new Purchase(getPage()).clickCheckout();
});

When('I fill in the shipping information', async (dataTable: DataTable) => {
    const data = dataTable.hashes()[0]; // Get the first row of data
    await new Purchase(getPage()).fillShippingInfo(
        data.firstName,
        data.lastName,
        data.zipCode
    );
});

When('I click continue', async () => {
    await new Purchase(getPage()).clickContinue();
});

When('I click finish', async () => {
    await new Purchase(getPage()).clickFinish();
});

Then('I should see the confirmation message {string}', async (expectedMessage: string) => {
    await new Purchase(getPage()).validateConfirmationMessage(expectedMessage);
});