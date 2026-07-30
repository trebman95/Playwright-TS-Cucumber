import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Checkout } from '../pages/checkout.page';

Then('I will fill out and submit checkout form with {string} and {string} and {string}', async (firstname, lastname, zipcode) => {
  await new Checkout(getPage()).submitCheckoutForm(firstname, lastname, zipcode);
})

Then('I will see the message {string}', async (message) => {
    await new Checkout(getPage()).validateCompletedMessage(message)
})