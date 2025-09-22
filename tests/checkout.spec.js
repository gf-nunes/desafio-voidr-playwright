import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';

test.describe('Fluxo de Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  test('7. Finalizar a compra com sucesso', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.goToCheckout();
    await checkoutPage.fillInformationAndContinue('Gislinda', 'Tester', '12345-678');

    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    await checkoutPage.finishCheckout();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.backHomeButton).toBeVisible();
  });

  test('8. Tentar finalizar a compra sem preencher os dados', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.goToCheckout();
    await checkoutPage.continueButton.click();

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

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('10. Persistência do carrinho após logout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.cartLink.locator('.shopping_cart_badge')).toHaveText('1');

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.cartLink.locator('.shopping_cart_badge')).toHaveText('1');
  });
});