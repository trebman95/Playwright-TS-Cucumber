//import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test"; // Import expect


const { Given, When, Then }= createBdd();

Given('I open the {string} page', async ({page}, url) => {
	await page.goto(url);
  });
Then('I should see the title {string}',async ({page},title) => {
	(await page.title()).includes(title).toBeTruthy;});


Then('I will login as {string}', async ({page}, username) =>  {

	await page.locator('#user-name').fill(username);
	await page.locator('#password').fill('secret_sauce');
	await page.locator('#login-button').click();

	const errorMessage = await page.locator('.error-message-container').allInnerTexts();
    expect(errorMessage.includes('Epic sadface')).toBeTruthy;
	});


