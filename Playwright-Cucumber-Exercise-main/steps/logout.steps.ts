import { Then } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixture';
import { expect } from '@playwright/test';
import { MenuPage } from '../pages/menu.page';

let menuPage: MenuPage;

Then('I open the menu', async () => {
  menuPage = new MenuPage(pageFixture.page);
  await menuPage.openMenu();
});

Then('I click logout', async () => {
  await menuPage.clickLogout();
});

Then('I should be redirected to login page', async () => {
  await expect(pageFixture.page).toHaveURL('https://www.saucedemo.com/');
});