import { test, createBdd } from "playwright-bdd";

const { Given, When, Then }= createBdd(test);

//import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
 
Given('I open the Purchase page', async({page},url) => {
	await page.goto(url);
});

Then("Then I will login as  {string}", async({page},username) => {
	await page.locator('#user-name').fill(username);
	await page.locator('#password').fill('secret_sauce');
	await page.locator('#login-button').click();
});

Then('I will add the backpack to the cart', async({page},item) => {
	await page.locator('#add-to-cart-sauce-labs-backpack').click();
	//await page.locator('.shopping_cart_badge').includes('1').tobeTruthy;
	await page.locator('.shopping_cart_link').click();
	
	//await page.locator('.cart_item').includes('Sauce Labs Backpack').tobeTruthy;
	await page.locator('#checkout').click();
	await page.locator('#first-name').fill('Smrutiranjan');
	await page.locator('#last-name').fill('Mohanty');	
	await page.locator('#postal-code').fill('123456');
	await page.locator('#continue').click();
	
	//await page.locator('.cart_item').includes('Sauce Labs Backpack').tobeTruthy;
	await page.locator('#finish').click();
	//await page.locator('.complete-header').includes('Thank you for your order!').tobeTruthy;
});