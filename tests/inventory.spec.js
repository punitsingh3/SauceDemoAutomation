// @ts-check
const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {Inventory} = require('../pages/Inventory');
const constants = require('../data/constants');

/** @type {LoginPage} */
let loginPage;

/** @type {Inventory} */
let inventory;

test.beforeEach(async({page})=>{  
    loginPage = new LoginPage(page);
    inventory = new Inventory(page);
    await loginPage.open();

});

test ('cart badge updates when product is added to cart', async({page})=>{
    inventory.addProductToCart(constants.text.sauceLabBackpackText);
    inventory.addProductToCart(constants.text.sauceLabBikeLightText);
    const cartCount =await inventory.getCartCount();
    expect(cartCount).toBe(2);
})

test('Products can be sorted by price from low to high', async({page})=>{
    inventory.sortBy(constants.sortOptions.priceLowToHigh);  // it will click on the sort dropdown
    const prices = await inventory.getAllProductPrices(); // it will get all the product prices
    const sortedPrices =[...prices].sort((a,b)=>a-b); // sort the prices in ascending order
    expect(prices).toEqual(sortedPrices); // check if the prices are sorted in ascending order

});



