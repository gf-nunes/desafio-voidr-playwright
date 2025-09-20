// pages/checkout.page.js

export class CheckoutPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      // Página 1: Suas Informações
      this.firstNameInput = page.locator('[data-test="firstName"]');
      this.lastNameInput = page.locator('[data-test="lastName"]');
      this.postalCodeInput = page.locator('[data-test="postalCode"]');
      this.continueButton = page.locator('[data-test="continue"]');
      this.errorMessage = page.locator('[data-test="error"]');
  
      // Página 2: Visão Geral
      this.finishButton = page.locator('[data-test="finish"]');
      this.cancelButton = page.locator('[data-test="cancel"]');
      this.summaryInfo = page.locator('.summary_info');
  
      // Página 3: Conclusão
      this.completeHeader = page.locator('.complete-header');
      this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }
  
    /**
     * Preenche o formulário de informações do checkout e continua.
     * @param {string} firstName - O primeiro nome.
     * @param {string} lastName - O sobrenome.
     * @param {string} postalCode - O código postal.
     */
    async fillInformationAndContinue(firstName, lastName, postalCode) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
      await this.continueButton.click();
    }
  
    /**
     * Finaliza a compra a partir da página de visão geral.
     */
    async finishCheckout() {
      await this.finishButton.click();
    }
  }