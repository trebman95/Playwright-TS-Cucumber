import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I sort the items by {string}', async (sort)=> {
  await new Product(getPage()).sortItemsByPrice(sort);
});

 Then('I should see all products sorted by price {string}', async (sort) => {
   await new Product(getPage()).validateProductsAreSortedByPrice(sort);   
});

 

