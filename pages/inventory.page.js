export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productSortContainer = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
  }

  getAddToCartButtonId(productName) {
    const id = productName.toLowerCase().replace(/ /g, '-');
    return `#add-to-cart-${id}`;
  }

  getRemoveButtonId(productName) {
    const id = productName.toLowerCase().replace(/ /g, '-');
    return `#remove-${id}`;
  }

  async addProductToCart(productName) {
    const buttonSelector = this.getAddToCartButtonId(productName);
    await this.page.locator(buttonSelector).click();
  }

  async removeProductFromCart(productName) {
    const buttonSelector = this.getRemoveButtonId(productName);
    await this.page.locator(buttonSelector).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortProductsBy(option) {
    await this.productSortContainer.selectOption(option);
  }

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