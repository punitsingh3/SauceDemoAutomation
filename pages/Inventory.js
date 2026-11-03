class Inventory{
    constructor(page){
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge=page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]'); 
              
    }

    getProductCard(productName){
        return this.inventoryItems.filter({hasText:productName});


    }
    
    async addProductToCart(productName){
        const product = this.getProductCard(productName);
        await product.getByRole('button',{name:'Add to cart'}).click();

    }

    async getCartCount(){
        const hasBadge = await this.cartBadge.count();
        if(hasBadge ===0) return 0;
        return parseInt(await this.cartBadge.textContent(),10);

    }

    async sortBy(optionValue){
        this.sortDropdown.selectOption(optionValue); // this will select the option with the given value

    }

    async getAllProductPrices(){
        const priceTexts = await this.itemPrices.allTextContents();
        return priceTexts.map((p)=>parseFloat(p.replace('$',''))); // remove the $ sign and convert to float

        
    }

   

}

module.exports = {Inventory};