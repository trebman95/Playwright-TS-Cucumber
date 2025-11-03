Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page 
    And I Login as "standard_user" with password "secret_sauce"

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
  Scenario Outline:  Validate product sort by price <sort>
   When I sort the products by "<sort>"
    Then all products should be displayed in "<sort>" order
    # TODO: Sort the items by <sort>
    # TODO: Validate all 6 items are sorted correctly by price
  Examples:
    # TODO: extend the datatable to paramterize this test
    | sort |
    | Price (low to high) |
    | Price (high to low) |
    
    import { Given, When, Then } from '@cucumber/cucumber' // Import Cucumber step functions
import { chromium, Browser, Page } from 'playwright' // Import Playwright classes
import { expect } from '@playwright/test' // Import Playwright's expect for assertions 
let browser: Browser;
let page: page;
Given('I open the {string} page', async function (url: string) {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  await page.goto(url);
});
Given('I login as {string} with password {string}', async function (username: string, password: string) {
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
  await page.waitForSelector('.inventory_list');
});
When('I sort the products by {string}', async function (sortOption: string) {
  // select dropdown element
  const sortDropdown = await page.locator('.product_sort_container');
  await sortDropdown.selectOption({ label: sortOption });
});
Then('all products should be displayed in {string} order', async function (sortOption: string) {
  // get all product prices from the page
  const priceElements = await page.$$('.inventory_item_price');
  const prices = [];

  for (const element of priceElements) {
    const text = await element.textContent();
    if (text) {
      prices.push(parseFloat(text.replace('$', '')));
    }
  }

  const sortedPrices = [...prices].sort((a, b) =>
    sortOption.includes('low to high') ? a - b : b - a
  );

  expect(prices).toEqual(sortedPrices);

  await browser.close();
});

