import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";

Then('I select the cart', async () =>{
    await new Purchase(getPage()).openCart();
});
Then('I select the checkout', async () => {
    await new Purchase(getPage()).clickCheckout();
});
Then('I fill the checkout details', async () => {
    await new Purchase(getPage()).fillCheckoutDetails();
});
Then('I select continue', async () => {
    await new Purchase(getPage()).clickContinue();
});
Then('I select finish', async () => {
    await new Purchase(getPage()).clickFinish();
});
Then('I should see the text {string}', async(expectedMessage) => {
    const actualMessage = await new Purchase(getPage()).getSuccessMessage();

    expect(actualMessage?.trim()).toBe(expectedMessage);
});