import { Then , When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});
When("I will select the cart", async () => {
  await new Product(getPage()).selectCart();
});

When("I will select Checkout", async () => {
  await new Product(getPage()).selectCheckout();
});

When("I will fill in the checkout information", async () => {
  await new Product(getPage()).fillInCheckoutInformation(
    "John",
    "Doe",
    "12345"
  );
});

When("I will select Continue", async () => {
  await new Product(getPage()).selectContinue();
});

When("I will select Finish", async () => {
  await new Product(getPage()).selectFinish();
});

Then(
  "I should see the purchase confirmation text {string}",
  async (expectedText: string) => {
    await new Product(getPage()).validateOrderCompletion();
  }
);
When("I sort the items by {string}", async (sortValue: string) => {
  await new Product(getPage()).sortItemsBy(sortValue);
});


Then("the items should be sorted by price {string}", async (direction: string) => {
  await new Product(getPage()).validatePricesSorted(direction as "asc" | "desc");
});