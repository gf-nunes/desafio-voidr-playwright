export class CartPage {
    constructor(page) {
      this.page = page;
      this.pageTitle = page.locator('.title');
      this.cartItems = page.locator('.cart_item');
      this.checkoutButton = page.locator('[data-test="checkout"]');
    }
  
    getProductLocatorByName(productName) {
      return this.cartItems.filter({
        has: this.page.locator(`.inventory_item_name:has-text("${productName}")`)
      });
    }
  
    async removeProduct(productName) {
      const productContainer = this.getProductLocatorByName(productName);
      await productContainer.locator('button:has-text("Remove")').click();
    }
  
    async goToCheckout() {
      await this.checkoutButton.click();
    }
  }