const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {Inventory} = require('../pages/Inventory');
const constants = require('../data/constants');
const {Cart}= require('../pages/CartPage');

/** @type {LoginPage} */
let loginPage;

/** @type {Cart} */
let cart;

/** @type {Inventory} */
let inventory;



test.beforeEach(async({page})=>{  
    loginPage = new LoginPage(page);
    inventory = new Inventory(page);

    await loginPage.open();
    await loginPage.Login(users.standardUser.username, users.standardUser.password);


});

test ('added products appear correctly in cart', async({page})=>{
    inventory.addProductToCart(constants.text.sauceLabBackpackText);
    inventory.addProductToCart(constants.text.sauceLabBikeLightText);

    await this.cart.goToCart();
    await expect(page).toHaveURL(constants.urls.cart);
    const itemNames = await cart.getAllCartNames();
    expect(itemNames).toEqual([constants.text.sauceLabBackpackText, constants.text.sauceLabBikeLightText]);
});

test('product can be removed from cart', async({page})=>{
    inventory.addProductToCart(constants.text.sauceLabBackpackText);
    inventory.addProductToCart(constants.text.sauceLabBikeLightText);
    await cart.removeProduct(constants.text.sauceLabBackpackText);

    const count = await cart.getCartCount();
    expect(count).toBe(1);

    const remainingItemNames = await cart.getAllCartNames();
    expect(remainingItemNames).toEqual([constants.text.sauceLabBikeLightText]);
})

test('clicking checkout button navigates to checkout page', async({page})=>{
    inventory.addProductToCart(constants.text.sauceLabBackpackText);
    inventory.addProductToCart(constants.text.sauceLabBikeLightText);
    await this.cart.goToCart();
    
    cart.clickCheckout();
    cart.fillCheckoutInformation(constants.checkoutData.firstName, constants.checkoutData.lastName, constants.checkoutData.postalCode);
    cart.continueOverviewButton();

    await expect(page).toHaveURL(constants.urls.checkout2url);
    const subtotal = await cart.getSubtotal();
    const tax = await cart.getTax();
    const total = await cart.getTotalPrice();

    expect(total).toBeCloseTo(subtotal + tax, 2); // check if total is equal to subtotal + tax with a precision of 2 decimal places 

    cart.clickFinishButton();
    await expect(page).toHaveURL(constants.urls.thankyouPageUrl);

    await expect(cart.getCompleteHeaderButton()).toHaveText('Thank you for your order!');

})  

