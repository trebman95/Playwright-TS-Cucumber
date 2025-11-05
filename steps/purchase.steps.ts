import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { Checkout} from '../pages/checkout.page';  


Then('I will view the cart', async () => {
    await new Product(getPage()).openCart();
    
});

Then('I will proceed to checkout', async () => {
    await new Product(getPage()).clickCheckout();
});

Then('I will fill in purchase information: {string}, {string}, {string}', async (firstName, lastName, postalCode) => {
    await new Checkout(getPage()).enterCheckoutInformation(firstName, lastName, postalCode);
    
});

Then('I will continue to the overview page', async () => {
    await new Checkout(getPage()).continueToOverview();
    
});

Then('I will finish the purchase', async () => {
    await new Checkout(getPage()).finishPurchase();
    
});
Then('I should see the order confirmation text {string}', async (expectedMessage) => {
    const actualMessage = await new Checkout(getPage()).getConfirmationMessage();
    if (actualMessage.trim() !== expectedMessage) {
        throw new Error(`Expected confirmation message to be "${expectedMessage}" but found "${actualMessage.trim()}"`);
        
    }
}); 
