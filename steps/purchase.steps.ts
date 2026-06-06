import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';
import { Login } from '../pages/login.page';
import * as punycode from "node:punycode";


Then('I will login with {string} as the user', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

// Then('I will add the backpack to the cart', async () =>
// {
//     await new Purchase(getPage()).click('add-to-cart-sauce-labs-backpack');
// });

Then('I will go to the cart', async () =>
{
    await new Purchase(getPage()).goToCart();
});

Then('I will click {string}', async (clickId) =>
{
    await new Purchase(getPage()).click(clickId);
});

Then('I will fill in my First Name, Last Name, and Postal Code', async () =>
{
    await new Purchase(getPage()).fillInInfo();
});

Then('I will select continue', async () =>
{
    await new Purchase(getPage()).clickContinue()
});



Then('I should see the header {string}', async (expectedHeader) =>
{
    await new Purchase(getPage()).validateComplete(expectedHeader)
});