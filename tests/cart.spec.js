// tests/cart.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';

test.describe('Funcionalidades do Inventário e Carrinho', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('3. Adicionar item ao carrinho', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.addProductToCart(productName);
    const cartBadge = inventoryPage.cartLink.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
    const productContainer = inventoryPage.inventoryItems.filter({ hasText: productName });
    await expect(productContainer.locator('button')).toHaveText('Remove');
  });

  test('4. Remover item do carrinho (da página de inventário)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productName = 'Sauce Labs Bike Light';
    await inventoryPage.addProductToCart(productName);
    const cartBadge = inventoryPage.cartLink.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
    await inventoryPage.removeProductFromCart(productName);
    await expect(cartBadge).not.toBeVisible();
    const productContainer = inventoryPage.inventoryItems.filter({ hasText: productName });
    await expect(productContainer.locator('button')).toHaveText('Add to cart');
  });

  test('5. Ordenação de produtos por preço (menor para o maior)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortProductsBy('lohi');
    const prices = await inventoryPage.getProductsPrices();
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('6. Remover item a partir da página do carrinho', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const productName = 'Sauce Labs Fleece Jacket';

    await inventoryPage.addProductToCart(productName);
    await expect(inventoryPage.inventoryItems.filter({ hasText: productName }).locator('button')).toHaveText('Remove');

    await inventoryPage.goToCart();
    
    // Espera a página carregar esperando pelo título
    await expect(cartPage.pageTitle).toBeVisible();

    // Com o novo seletor, a verificação agora será precisa
    const productInCart = cartPage.getProductLocatorByName(productName);
    await expect(productInCart).toHaveCount(1);

    await cartPage.removeProduct(productName);
    await expect(productInCart).toHaveCount(0);
  });
});