import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Checkout } from "../pages/checkout.page";

Then("I open the cart", async () => {
    await new Checkout(getPage()).openCart();
});
Then("I proceed to checkout", async () => {
    await new Checkout(getPage()).checkout();
});

Then(
    "I enter checkout details with first name {string}, last name {string}, and postal code {string}",
    async (firstName, lastName, postalCode) => {
        await new Checkout(getPage()).enterCheckoutDetails(
            firstName,
            lastName,
            postalCode,
        );
    },
);
Then("I continue checkout", async () => {
    await new Checkout(getPage()).continueCheckout();
});

Then("I finish the purchase", async () => {
    await new Checkout(getPage()).finishPurchase();
});

Then(
    "I should see the purchase confirmation text {string}",
    async (expectedText) => {
        await new Checkout(getPage()).validatePurchaseConfirmationText(
            expectedText,
        );
    },
);
