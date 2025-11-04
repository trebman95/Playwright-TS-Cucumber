import { Then,When } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';




Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will add the Tshirt to cart', async () => {
      await new Product(getPage()).addTShirtToCart();
});


Then('I will click on the sort filter', async function () {
 const productPage = new Product(getPage());
    await productPage.selectCart();
});

When('I Sort the items by Price \\(high to low)', async function () {
  this.sortOption = 'Price (high to low)';
  await new Product(getPage()).sortItems(this.sortOption);
});

Then('Sort the items by Price \\(low to high)', async function () {
  this.sortOption = 'Price (low to high)';
  await new Product(getPage()).sortItems(this.sortOption);
});

 Then('I Validate all {int} items are sorted correctly by price', async function (int) {
    await new Product(getPage()).validateSorting(this.sortOption);
 });

