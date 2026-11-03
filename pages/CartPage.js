class Cart{
    constructor(page){
        this.cartLink = page.locator('[data-test="shopping-cart-badge"]');
        this.itemNames = page.locator('[data-test="cart-item-name"]');
        this.cartItem = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton =page.locator('[data-tests="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueOverviewButton = page.locator('[data-test="continue"]'); 
        this.subtotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.getCompleteHeaderButton = page.locator('[data-test="complete-header"]');



    }

    async goToCart(){
        await this.cartLink.click();
    }

    async getAllCartNames(){
        return await this.itemNames.allTextContents();

    }

    async removeProduct(productName){
        const item = this.getCartItem(productName);
        
        await item.getByRole('button',{name:'Remove'}).click();

    }

    getCartItem(productName){
        return this.cartItem.filter({hasText: productName});

    }

    async getCartCount(){
        return this.cartItem.count();
    }

    async clickCheckout(){
        await this.checkoutButton.click();
    }

    async fillCheckoutInformation(firstName, lastName, postalCode){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

     async clickContinueOverview(){
        await this.continueOverviewButton.click();
    }

    async getSubtotal(){
        const text = await this.subtotal.textContent();
        return parseFloat(text.replace('Item total: $',''));
    }

    async getTax(){
        const text = await this.tax.textContent();
        return parseFloat(text.replace('Tax: $',''));
    }

    async getTotalPrice(){
        const text = await this.totalPrice.textContent();
        return parseFloat(text.replace('Total: $',''));
    }

    async clickFinishButton(){
        await this.finishButton.click();
    }

    
}

module.exports = {Cart};