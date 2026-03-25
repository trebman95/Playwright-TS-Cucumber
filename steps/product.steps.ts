import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";
import { Product } from "../pages/product.page";

Then("I will add the backpack to the cart", async () => {
    await new Product(getPage()).addBackPackToCart();
});

Then("I sort the products by {string}", async (sortOption) => {
    await new Product(getPage()).sortProductsBy(sortOption);
});

Then(
    "I should see {int} products sorted by price in {string} order",
    async (expectedCount, order) => {
        await new Product(getPage()).validateProductPricesSorted(
            order,
            expectedCount,
        );
    },
);
