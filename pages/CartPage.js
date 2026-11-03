class Cart{
    constructor(page){
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueOverviewButton = page.getByRole('button', { name: 'Continue' });
        this.subtotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.completeHeaderButton = page.getByText('Thank you for your order!');
    }

    async goToCart(){
        await this.cartLink.click();
    }

    async getAllCartNames(){
        return await this.itemNames.allTextContents();
    }

    async removeProduct(productName){
        const item = this.getCartItem(productName);
        await item.getByRole('button', { name: 'Remove' }).click();
    }

    getCartItem(productName){
        return this.cartItems.filter({ hasText: productName });
    }

    async getCartCount(){
        return await this.cartItems.count();
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
        return parseFloat(text.replace('Item total: $', '').trim());
    }

    async getTax(){
        const text = await this.tax.textContent();
        return parseFloat(text.replace('Tax: $', '').trim());
    }

    async getTotalPrice(){
        const text = await this.totalPrice.textContent();
        return parseFloat(text.replace('Total: $', '').trim());
    }

    async clickFinishButton(){
        await this.finishButton.click();
    }

    getCompleteHeaderButton(){
        return this.completeHeaderButton;
    }
}

module.exports = {Cart};