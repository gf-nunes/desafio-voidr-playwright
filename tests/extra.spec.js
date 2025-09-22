import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';

test.describe('Testes Extras e de Análise Crítica', () => {

  test('11. Login com usuário bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('12. Verificação das imagens dos produtos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);

    const images = inventoryPage.inventoryItems.locator('.inventory_item_img img');
    const imageCount = await images.count();
    
    expect(imageCount).toBeGreaterThan(0);

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);

      const naturalWidth = await image.evaluate(img => img.naturalWidth);
      
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

});