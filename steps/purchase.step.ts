import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Purchase } from "../pages/purchase.page";

Then("I select the cart", async () => {await new Purchase(getPage()).selectCart();
});

Then("I select checkout", async () => {
  await new Purchase(getPage()).selectCheckout();
});

Then("I fill in the checkout information with {string}, {string}, {string}",
  async (firstName: string, lastName: string, zipCode: string) => {
    await new Purchase(getPage()).fillCheckoutInformation(
      firstName,
      lastName,
      zipCode,
    );
  },
);

Then("I select continue", async () => {await new Purchase(getPage()).selectContinue();
});

Then("I select finish", async () => {await new Purchase(getPage()).selectFinish();
});

Then("I validate the successful purchase text is {string}", async (expectedText: string) => {
    await new Purchase(getPage()).validateSuccessfulPurchaseText(expectedText);
  },

);
