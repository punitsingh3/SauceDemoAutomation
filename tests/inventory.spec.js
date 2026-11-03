// @ts-check
const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {Inventory} = require('../pages/Inventory');
const constants = require('../data/constants');
const users = require('../data/users');

/** @type {LoginPage} */
let loginPage;

/** @type {Inventory} */
let inventory;

test.beforeEach(async({page})=>{  
    loginPage = new LoginPage(page);
    inventory = new Inventory(page);
    await loginPage.open();
    await loginPage.Login(users.standardUser.username, users.standardUser.password);
});

test ('cart badge updates when product is added to cart', async({page})=>{
    await inventory.addProductToCart(constants.text.sauceLabBackpackText);
    await inventory.addProductToCart(constants.text.sauceLabBikeLightText);
    const cartCount = await inventory.getCartCount();
    expect(cartCount).toBe(2);
})

test('Products can be sorted by price from low to high', async({page})=>{
    await inventory.sortBy(constants.sortOptions.priceLowToHigh);
    const prices = await inventory.getAllProductPrices();
    const sortedPrices = [...prices].sort((a,b)=>a-b);
    expect(prices).toEqual(sortedPrices);
});



