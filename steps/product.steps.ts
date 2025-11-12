import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort the item by {string}', async(sortBy) =>{
  await new Product(getPage()).sortBy(sortBy);  
});

Then('validate all 6 items are sorted correctly by price by {string}', async(sortBy) => { 
await new Product(getPage()).validateSort(sortBy);

});