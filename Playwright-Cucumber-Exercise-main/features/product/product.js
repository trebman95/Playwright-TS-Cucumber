import { test,createBdd } from "playwright-bdd";
import {  expect } from '@playwright/test';
const { Given, When, Then }= createBdd(test);
  
Given('I open the Product page', async({page},url) => {
	await page.goto(url);
});

When('I will login as user', async ({page}, username) =>  {

	await page.locator('#user-name').fill(username);
	await page.locator('#password').fill('secret_sauce');
	await page.locator('#login-button').click();
	await page.locator('.inventory_list').isVisible();
	await page.locator('.inventory_list').shouldBeVisible();
});

Then('I sort products by {string}', async ({page}, sort_option) => {

	if(sort_option === 'Price (low to high)') {

	await page.locator('.product_sort_container').click();
	await page.locator('.product_sort_container').selectOption('lohi');

    const firstProductText = await page.locator('.inventory_item').first().allInnerTexts();
	console.log('First product:', firstProductText);
	expect(firstProductText.some(text => text.includes('Sauce Labs Onesie'))).toBeTruthy();	
	
	const lastProductText = await page.locator('.inventory_item').last().allInnerTexts();
	
	console.log('Last product:', lastProductText);
	expect(lastProductText.some(text => text.includes('Sauce Labs Fleece Jacket'))).toBeTruthy();

	 
	}
	else if(sort_option === 'Price (high to low)') {

		await page.locator('.product_sort_container').click();
		await page.locator('.product_sort_container').selectOption('hilo');

		const firstProductText = await page.locator('.inventory_item').first().allInnerTexts();
	console.log('First product:', firstProductText);
	expect(firstProductText.some(text => text.includes('Sauce Labs Fleece Jacket'))).toBeTruthy();	
	
	const lastProductText = await page.locator('.inventory_item').last().allInnerTexts();
	
	console.log('Last product:', lastProductText);
	expect(lastProductText.some(text => text.includes('Sauce Labs Onesie'))).toBeTruthy();

		
	}
	
});
