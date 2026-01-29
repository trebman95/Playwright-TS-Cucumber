import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('I should see the product added to the cart', async () => {
  await new Product(getPage()).validateProductAddedToCart();
});

Then('I will add the {string} to the cart', async (itemName) => {
  await new Product(getPage()).additemToCartByName(itemName);
}); 


Then('I will navigate to the cart', async () => {
  await new Product(getPage()).navigateToCart();
}); 

Then('I will sort items by {string}', async (sortOption) => {
  await new Product(getPage()).sortItemsBy(sortOption);
});

Then('I should see items sorted as selected by price {string}', async (sortOption) => {
  const page = getPage();
  const itemPricesLocator = page.locator('.inventory_item_price');
  const itemCount = await itemPricesLocator.count();
  const itemNamesLocator = page.locator('.inventory_item_name');
  
  const prices: number[] = [];
  for (let i = 0; i < itemCount; i++) {
    const priceText = await itemPricesLocator.nth(i).textContent();

    if (priceText) {
      const price = parseFloat(priceText.replace('$', ''));
      prices.push(price);
    }
  }
  const sortedPrices = [...prices];
  const sortedNames: string[] = [];

  if (sortOption === 'Price (low to high)') {
    sortedPrices.sort((a, b) => a - b);
  } else if (sortOption === 'Price (high to low)') {

    sortedPrices.sort((a, b) => b - a);
  } else 
  {
    for (let i = 0; i < itemCount; i++) {
      const nameText = await itemNamesLocator.nth(i).textContent();
      if (nameText) {
        sortedNames.push(nameText);
      }
    }
    if (sortOption === 'Name (A to Z)') {
        sortedNames.sort();
    } else if (sortOption === 'Name (Z to A)'){
        sortedNames.sort().reverse();
    }
  }


  
  if( sortOption === 'Name (A to Z)' || sortOption === 'Name (Z to A)') {
    for (let i = 0; i < sortedNames.length; i++) {
      const actualName = await itemNamesLocator.nth(i).textContent();
      if (actualName !== sortedNames[i]) {
        throw new Error(`Items are not sorted by ${sortOption}`);
      }
    }
  }
  else if (sortOption === 'Price (low to high)' || sortOption === 'Price (high to low)'){
      for (let i = 0; i < prices.length; i++) {
        if (prices[i] !== sortedPrices[i]) {
          throw new Error(`Items are not sorted by ${sortOption}`);
        } 
    }
  }
});

Then('I will add item to cart by name {string}', async (itemName) => {
  await new Product(getPage()).additemToCartByName(itemName);
});




