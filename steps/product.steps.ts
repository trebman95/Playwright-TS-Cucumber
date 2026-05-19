import { When,Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { expect } from '@playwright/test';



Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});
When('I sort the products by {string}', async (sortOption) => {
  await new Product(getPage()).sortProducts(sortOption);
});
Then('products should be sorted correctly by {string}', async (sortOption)=>{
  const prices = await new Product(getPage()).getAllProductPrices();
  let expectedPrices = [...prices];
  if (sortOption === 'Price (low to high)'){
    expectedPrices.sort((a,b) => a-b);
  }else{
    expectedPrices.sort((a,b)=> b-a);
  }
  expect(prices).toEqual(expectedPrices);
});