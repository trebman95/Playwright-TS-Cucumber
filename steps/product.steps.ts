import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I will sort products by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortProductsBy(sortOption);
});

Then('I should validate all products are sorted by {string}', async (sortOption: string) => {
  const product = new Product(getPage());
  
  // Validate 6 products are present
  await product.validateProductCountIs(6);
  
  // Validate sorting based on the option
  if (sortOption.toLowerCase().includes('price') && sortOption.toLowerCase().includes('low')) {
    await product.validateProductsSortedByPrice('asc');
  } else if (sortOption.toLowerCase().includes('price') && sortOption.toLowerCase().includes('high')) {
    await product.validateProductsSortedByPrice('desc');
  } else if (sortOption.toLowerCase().includes('name') && sortOption.toLowerCase().includes('z to a')) {
    await product.validateProductsSortedByName('desc');
  } else if (sortOption.toLowerCase().includes('name') && sortOption.toLowerCase().includes('a to z')) {
    await product.validateProductsSortedByName('asc');
  }
});