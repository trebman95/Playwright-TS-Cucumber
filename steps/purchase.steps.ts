import { Then, DataTable } from '@cucumber/cucumber';
import { getPage, delay } from '../playwrightUtilities';
import { Purchase } from '../pages/purchase.page';

Then('I proceed to checkout with details:', async (dataTable: DataTable) => {
  const data = dataTable.hashes()[0];
  await new Purchase(getPage()).checkout(data.FirstName, data.LastName, data.PostalCode);
  await delay(1500);
});

Then('I complete the purchase', async () => {
  await new Purchase(getPage()).finishPurchase();
  await delay(1000);
});

Then('I should see the success message {string}', async (expected: string) => {
  await new Purchase(getPage()).validateSuccessMessage(expected);
  await delay(1000);
});
