import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

Then('I will add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

Then('Then I will sort the items from high to low', async () => {
  await new Product(getPage()).sortHighToLow();
})

Then('Then I will sort the items from low to high', async () => {
  await new Product(getPage()).sortLowToHigh();
})

Then('I should see the products listed by price from {string}', async (sort: string) =>
{
  await new Product(getPage()).getListedPrices()
})

Then('Then I will sort the items from{string}', async (sort:string) =>
    {
      await new Product(getPage()).sortHighToLow();
    }
)