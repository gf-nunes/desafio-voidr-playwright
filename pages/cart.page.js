// pages/cart.page.js

export class CartPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.pageTitle = page.locator('.title');
      // MUDANÇA: Usando a classe CSS '.cart_item' em vez do atributo data-test
      this.cartItems = page.locator('.cart_item');
      this.checkoutButton = page.locator('[data-test="checkout"]');
    }
  
    /**
     * Retorna um localizador para um produto específico no carrinho, pelo seu nome.
     * @param {string} productName - O nome exato do produto.
     * @returns {import('@playwright/test').Locator}
     */
    getProductLocatorByName(productName) {
      return this.cartItems.filter({
        // MUDANÇA: Usando a classe CSS '.inventory_item_name' e buscando o texto
        has: this.page.locator(`.inventory_item_name:has-text("${productName}")`)
      });
    }
  
    /**
     * Remove um produto do carrinho pelo seu nome.
     * @param {string} productName - O nome exato do produto a ser removido.
     */
    async removeProduct(productName) {
      const productContainer = this.getProductLocatorByName(productName);
      await productContainer.locator('button:has-text("Remove")').click();
    }
  
    /**
     * Navega para a página de checkout.
     */
    async goToCheckout() {
      await this.checkoutButton.click();
    }
  }