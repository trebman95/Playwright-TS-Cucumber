import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Checkout } from '../pages/checkout.page';

Then('I will start to checkout', async () => {
    await new Checkout(getPage()).startCheckout();
})

Then('I will fill in my information', async () => {
    await new Checkout(getPage()).fillInCheckout();
})

Then('I will checkout', async () => {
    await new Checkout(getPage()).checkoutItems();
})