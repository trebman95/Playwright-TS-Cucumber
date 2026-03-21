import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';


Then('I will select cart on the top-right', async () => {
    await new Product(getPage()).selectCart();
});

Then('I will select Checkout', async () => {
    await new Product(getPage()).selectCheckout();
});


Then('I will Fill in the First Name, Last Name and Zip\\/Postal Code', async () => {
    await new Product(getPage()).fillInTheDetails();
});

Then('select continue', async () => {
    await new Product(getPage()).selectContinue();
});


Then('select finish', async () => {
    await new Product(getPage()).selectFinish();
});


Then('validate the text {string}', async (expectedMsg) => {
    await new Product(getPage()).validateFinalMessage(expectedMsg);
});

Then('I should see the cart badge count as {string}', async (count)=> {
     await new Product(getPage()).validateCartBadgeCount(count);

});
