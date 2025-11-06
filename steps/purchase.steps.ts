import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';
import { Purchase } from '../pages/purchase.page';
import { Product } from '../pages/product.page';
import { expect } from '@playwright/test';

Then('I check out', async () => {
    await new Purchase(getPage()).checkout();
})

Then('I see a thank you message', async () => {
    await new Purchase(getPage()).thankYou();
})
