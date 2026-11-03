const{test,expect}=require('@playwright/test');
const {LoginPage}=require('../pages/LoginPage');
const users = require('../data/users');
const constants = require('../data/constants');

/** @type {LoginPage} */
let loginPage;

test.beforeEach(async({page})=>{
    loginPage=new LoginPage(page);
    await loginPage.open();
});



//test case 1 - login scenario
test('User can login with valid credentials @smoke',async({page})=>{

await loginPage.Login(users.standardUser.username, users.standardUser.password);

 await expect(page).toHaveURL(constants.urls.inventory);
 await expect(page.locator('.title')).toHaveText(constants.text.productTitle);
 

});