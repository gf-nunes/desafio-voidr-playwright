// tests/checkout.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';

test.describe('Fluxo de Checkout', () => {

  // O beforeEach agora prepara o cenário deixando um item no carrinho
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Adiciona um item para que o checkout seja possível
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  test('7. Finalizar a compra com sucesso', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.goToCheckout();
    await checkoutPage.fillInformationAndContinue('Gislinda', 'Tester', '12345-678');

    // Verifica se chegou na página de overview
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    // Verifica se o item correto está na página de overview
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    await checkoutPage.finishCheckout();

    // Verifica a mensagem de sucesso
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.backHomeButton).toBeVisible();
  });

  test('8. Tentar finalizar a compra sem preencher os dados', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.goToCheckout();
    await checkoutPage.continueButton.click(); // Tenta continuar sem preencher nada

    // Verifica a mensagem de erro
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
  });

  test('9. Cancelar a compra na tela de overview', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.goToCheckout();
    await checkoutPage.fillInformationAndContinue('Gislinda', 'Tester', '12345-678');

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await checkoutPage.cancelButton.click();

    // Verifica se voltou para a página de inventário
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('10. Persistência do carrinho após logout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // O item já foi adicionado no beforeEach
    // Verifica se o ícone do carrinho tem o número "1"
    await expect(inventoryPage.cartLink.locator('.shopping_cart_badge')).toHaveText('1');

    // Faz logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    // Verifica se voltou para a tela de login
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Faz login novamente
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    // Verifica se o item AINDA está no carrinho
    await expect(inventoryPage.cartLink.locator('.shopping_cart_badge')).toHaveText('1');
  });
});