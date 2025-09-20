// pages/login.page.js

export class LoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('[data-test="username"]');
      this.passwordInput = page.locator('[data-test="password"]');
      this.loginButton = page.locator('[data-test="login-button"]');
      this.errorMessage = page.locator('[data-test="error"]');
    }
  
    /**
     * Navega para a página de login.
     */
    async goto() {
      await this.page.goto('/');
    }
  
    /**
     * Preenche o formulário de login e submete.
     * @param {string} username - O nome de usuário.
     * @param {string} password - A senha.
     */
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  }