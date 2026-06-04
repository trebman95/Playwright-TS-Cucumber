import { Product } from './../pages/product.page';
import { Then } from "@cucumber/cucumber";
import { getPage } from "../playwrightUtilities";

Then("I will sort items by {string}", async (sortOption: string) => {
      await new Product(getPage()).selectSortOption(sortOption);
})

Then("The items should be sorted by price {string}", async (sortOption: string) => {
      await new Product(getPage()).assertPricesSorted(sortOption);
})

Then("The items should be sorted by name {string}", async (sortOption: string) => {
      await new Product(getPage()).assertNamesSorted(sortOption);
})

