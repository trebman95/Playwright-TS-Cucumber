Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page 
   And I login as "standard_user" with password "secret_sauce"

  Scenario:  Validate successful purchase text
  When I add the "Sauce Labs Backpack" to the cart
  And I proceed to checkout
   And I fill in the checkout details with:
      | firstName | lastName | postalCode |
      | John      | ruby       | 48032     |
    And I complete the purchase
    Then I should see the text "Thank you for your order!"
    # TODO: Select the cart (top-right)
    # TODO: Select Checkout
    # TODO: Fill in the First Name, Last Name, and Zip/Postal Code
    # TODO: Select Continue
    # TODO: Select Finish
    # TODO: Validate the text 'Thank you for your order!'

    import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;

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
    