// pages/inventory.page.js

export class InventoryPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productSortContainer = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Adiciona um produto ao carrinho pelo seu nome.
   * @param {string} productName - O nome exato do produto a ser adicionado.
   */
  async addProductToCart(productName) {
    const productContainer = this.inventoryItems.filter({ hasText: productName });
    await productContainer.locator('button:has-text("Add to cart")').click();
  }

  /**
   * Remove um produto do carrinho pelo seu nome, a partir da página de inventário.
   * @param {string} productName - O nome exato do produto a ser removido.
   */
  async removeProductFromCart(productName) {
    const productContainer = this.inventoryItems.filter({ hasText: productName });
    await productContainer.locator('button:has-text("Remove")').click();
  }

  /**
   * Navega para a página do carrinho de compras.
   */
  async goToCart() {
    await this.cartLink.click();
  }

  /**
   * Ordena os produtos na página.
   * @param {'az' | 'za' | 'lohi' | 'hilo'} option - A opção de ordenação.
   */
  async sortProductsBy(option) {
    await this.productSortContainer.selectOption(option);
  }

  /**
   * Retorna uma lista com os preços de todos os produtos visíveis.
   * @returns {Promise<number[]>} Uma lista de números representando os preços.
   */
  async getProductsPrices() {
    const priceElements = await this.inventoryItemPrices.all();
    const prices = [];
    for (const element of priceElements) {
      const priceText = await element.innerText();
      prices.push(parseFloat(priceText.replace('$', '')));
    }
    return prices;
  }
}