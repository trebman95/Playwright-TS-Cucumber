import {Given, Then } from '@cucumber/cucumber';
import { getPage} from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { Product } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkOut.page';

 Then('Select the cart \\(top-right)', async function () {
       const checkoutPage = new CheckoutPage(getPage());
    await checkoutPage.selectCart();   
         });


Then('Select Checkout', async() =>{
    const checkoutPage = new CheckoutPage(getPage());
    await checkoutPage.selectcheckout();
});

Then('Fill in the First Name, Last Name, and Zip\\/Postal Code', async function () {
          const checkoutPage = new CheckoutPage(getPage());
    await checkoutPage.fillcheckoutInformation('John','Doe','12345');
         });


Then('Select Continue', async () =>{
    const checkoutPage = new CheckoutPage(getPage());
    await checkoutPage.continueCheckout();
});

Then('Select Finish', async () =>{
    const checkoutPage = new CheckoutPage(getPage());
    await checkoutPage.finishcheckout();
});

Then('Validate the text {string}', async (expectedText:string) => {
    const checkoutPage = new CheckoutPage(getPage());
    await checkoutPage.validateSuccessfulPurchaseText(expectedText);
});