import { Then, When, } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { purchase } from '../pages/purchaase';
import { expect } from 'playwright/test';


Then ("I will add the backpack to the cart", async()=>{
const purchasepage = new purchase(getPage())
 await purchasepage.addBackPackToCart();
});

When ("Select the cart", async()=>{
const purchasepage = new purchase(getPage())
 await purchasepage.goToCart();
});
When ("Select Checkout", async()=>{
const purchasepage = new purchase(getPage())
 await purchasepage.Checkout();
});
When ("Fill in the {string}, {string}, and {string}", async(firstname,lastname,pincode)=>{
const purchasepage = new purchase(getPage())
 await purchasepage.userdetails(firstname,lastname,pincode);
});
When ("Select Continue", async()=>{
const purchasepage = new purchase(getPage())
 await purchasepage.Continue();
});
When ("Select Finish", async()=>{
const purchasepage = new purchase(getPage())
 await purchasepage.Finish();
});
Then ("Validate the text {string}", async(finalMessage)=>{
const purchasepage = new purchase(getPage())
 await purchasepage.assertMesage(finalMessage);

});
