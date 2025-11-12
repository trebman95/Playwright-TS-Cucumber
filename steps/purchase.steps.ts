import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I will select the cart', async () => {
  await new Purchase(getPage()).selectCart();
});

Then('I will select checkout', async () => {
  await new Purchase(getPage()).clickCheckout();
});

Then('I will enter {string}, {string} and {string}',async(firstName, lastName, postalCode)=>{
  await new Purchase(getPage()).fillUserDetails(firstName,lastName,postalCode); 

});

Then('I will select continue', async() => {
  await new Purchase(getPage()).clickContinue();
});
  
Then('I will select Finish', async() =>{
  await new Purchase(getPage()).clickFinish();
});  
  
Then('I should see the message {string}', async(confirmationMessage) =>{
  await new Purchase(getPage()).validateConfirmationMessage(confirmationMessage);
})
  