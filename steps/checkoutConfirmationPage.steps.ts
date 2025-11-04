import  { Then, When} from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { CheckoutConfirmation } from '../pages/checkoutConfirmation.page';

Then('I should see the title of the page as {string}', async (title) => {
    await new CheckoutConfirmation(getPage()).validateTitleOfPage(title);
  });

When('I fill in the firstName as {string}, lastName as {string}, and postalCode as {string}', function (firstName, lastName, postalCode) {
    new CheckoutConfirmation(getPage()).fillInCheckoutInformation(firstName, lastName, postalCode);
  });

When('I click on the continue button', async () => {
    await new CheckoutConfirmation (getPage()).clickContinueButton();
    });

Then('I click on the finish button', async () => {
    await new CheckoutConfirmation(getPage()).clickFinishButton();
    });

Then('I should see the text {string}', async (successMessage) => {
    await new CheckoutConfirmation (getPage()).validateSuccessMessage(successMessage);
    });