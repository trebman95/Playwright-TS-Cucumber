import { Then } from '@cucumber/cucumber';
import { ProductPage } from '../pages/product.page';
import { pageFixture } from '../hooks/pageFixture';

let productPage: ProductPage;

Then('I sort the products by {string}', async (sortOption: string) => {
  productPage = new ProductPage(pageFixture.page);
  await productPage.selectSortOption(sortOption);
});

Then(
  'I validate products are sorted by price {string}',
  async (sortOption: string) => {
    await productPage.validateProductSorting(sortOption);
  }
);