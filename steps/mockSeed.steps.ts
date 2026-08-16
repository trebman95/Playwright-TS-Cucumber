import { Given, DataTable } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { seedCart, productIdsForNames } from '../mocks/sauceDemoMocks';

Given('I seed the cart with the {string} item', async (itemName: string) => {
  await seedCart(getPage(), productIdsForNames([itemName]));
});

Given('I seed the cart with the following items:', async (table: DataTable) => {
  const names = table.raw().map((row) => row[0]);
  await seedCart(getPage(), productIdsForNames(names));
});

Given('I seed an empty cart', async () => {
  await seedCart(getPage(), []);
});
