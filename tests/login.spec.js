import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

test.describe('Autenticação no Sauce Demo', () => {

  test('1. Login com credenciais válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('2. Login com credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

});